using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
using HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;
using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Domain.Enums;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Application.Services;

public class QuestAttemptService : IQuestAttemptService
{
     private readonly AppDbContext _context;
    private readonly IQuestAttemptRepository _questAttemptRepository;

    public QuestAttemptService(AppDbContext context, IQuestAttemptRepository questAttemptRepository)
    {
        _context = context;
        _questAttemptRepository = questAttemptRepository;
    }

    public async Task<AttemptResultDto> SubmitAttemptAsync(Guid userId, SubmitAttemptDto attemptDto)
    {
        var quest = await _context.Quests
            .Include(q => q.QuestTasks)
            .ThenInclude(t => t.Options)
            .FirstOrDefaultAsync(q => q.Id == attemptDto.QuestId);

        if (quest == null) throw new Exception("Квест не знайдено!");

        double totalScore = 0;
        var correctTasks = new Dictionary<Guid, string>();
        var correctAnswers = new Dictionary<Guid, List<string>>();

        int totalTasks = quest.QuestTasks.Count;
        if (totalTasks == 0) return new AttemptResultDto { Score = 0 };

        double maxPointsPerTask = (double)quest.QuestScore / totalTasks;

        foreach (var task in quest.QuestTasks)
        {
            var taskId = task.Id;
            var correctOptions = task.Options
                .Where(o => o.IsCorrect)
                .Select(o => o.Text.Trim())
                .ToList();

            correctAnswers[taskId] = correctOptions;

            if (!attemptDto.Answers.TryGetValue(taskId, out List<string>? userAnswers) || userAnswers.Count == 0)
            {
                correctTasks[taskId] = "false";
                continue;
            }

            var selectedOptions = userAnswers
                .Select(a => a.Trim())
                .ToList();

            switch (task.QuestionType)
            {
                case QuestionType.SingleChoice:
                case QuestionType.OpenAnswer:
                    {
                        bool isCorrect = selectedOptions.SequenceEqual(correctOptions);
                        correctTasks[taskId] = isCorrect ? "true" : "false";
                        if (isCorrect) totalScore += maxPointsPerTask;
                        break;
                    }

                case QuestionType.MultipleChoice:
                    {
                        int correctSelectedCount = selectedOptions.Intersect(correctOptions).Count();
                        int correctTotalCount = correctOptions.Count;
                        int wrongSelectedCount = selectedOptions.Except(correctOptions).Count();

                        if (correctSelectedCount == correctTotalCount && wrongSelectedCount == 0)
                        {
                            correctTasks[taskId] = "true";
                            totalScore += maxPointsPerTask;
                        }
                        else if (correctSelectedCount > 0)
                        {
                            correctTasks[taskId] = "partiallyTrue";
                            double partialScore = (maxPointsPerTask * correctSelectedCount) / correctTotalCount;
                            totalScore += partialScore;
                        }
                        else
                        {
                            correctTasks[taskId] = "false";
                        }
                        break;
                    }
            }
        }

        // Фінальне округлення оцінки
        int finalScore = (int)Math.Round(totalScore);

        // Остаточна перевірка
        if (finalScore < quest.QuestScore && correctTasks.All(t => t.Value == "true"))
        {
            finalScore = quest.QuestScore; // Якщо всі відповіді правильні, даємо максимум.
        }

        var attempt = new QuestAttempt
        {
            Id = Guid.NewGuid(),
            QuestId = attemptDto.QuestId,
            UserId = userId,
            UserScore = finalScore,
            StartedAt = DateTime.UtcNow,
            CompletedAt = DateTime.UtcNow
        };

        await _questAttemptRepository.AddQuestAttemptAsync(attempt);

        return new AttemptResultDto
        {
            Score = finalScore,
            CorrectTasks = correctTasks,
            CorrectAnswers = correctAnswers
        };
    }


    
    public async Task<List<QuestAttempt>> GetUserAttemptsAsync(Guid userId)
    {
        return await _questAttemptRepository.GetUserAttemptsAsync(userId);
    }

}