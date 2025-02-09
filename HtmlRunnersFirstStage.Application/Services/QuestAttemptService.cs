using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
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

    if (quest == null) throw new Exception("Квест не найден!");

    int totalScore = 0;
    var correctTasks = new Dictionary<Guid, string>();
    var correctAnswers = new Dictionary<Guid, List<string>>();

    int totalTasks = quest.QuestTasks.Count;
    if (totalTasks == 0) return new AttemptResultDto { Score = 0 };

    int maxPointsPerTask = quest.QuestScore / totalTasks;

    foreach (var task in quest.QuestTasks)
    {
        var taskId = task.Id;

        // Собираем правильные ответы
        var correctOptions = task.Options
            .Where(o => o.IsCorrect)
            .Select(o => o.Text.Trim())
            .ToList();

        correctAnswers[taskId] = correctOptions;

        // Если ответа на этот таск нет — пропускаем
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
                    bool isCorrect = selectedOptions.Intersect(correctOptions).Any();

                    correctTasks[taskId] = isCorrect ? "true" : "false";
                    if (isCorrect) totalScore += maxPointsPerTask;
                    break;
                }

            case QuestionType.MultipleChoice:
                {
                    int correctSelectedCount = selectedOptions.Intersect(correctOptions).Count();
                    int correctTotalCount = correctOptions.Count;

                    if (correctSelectedCount == correctTotalCount && selectedOptions.Count == correctTotalCount)
                    {
                        correctTasks[taskId] = "true";
                        totalScore += maxPointsPerTask;
                    }
                    else if (correctSelectedCount > 0)
                    {
                        correctTasks[taskId] = "partiallyTrue";
                        int partialScore = (int)Math.Ceiling((double)(correctSelectedCount * maxPointsPerTask) / correctTotalCount);
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

    var attempt = new QuestAttempt
    {
        Id = Guid.NewGuid(),
        QuestId = attemptDto.QuestId,
        UserId = userId,
        UserScore = totalScore,
        StartedAt = DateTime.UtcNow,
        CompletedAt = DateTime.UtcNow
    };

    await _questAttemptRepository.AddQuestAttemptAsync(attempt);

    return new AttemptResultDto
    {
        Score = totalScore,
        CorrectTasks = correctTasks,
        CorrectAnswers = correctAnswers
    };
}
    
    public async Task<List<QuestAttempt>> GetUserAttemptsAsync(Guid userId)
    {
        return await _questAttemptRepository.GetUserAttemptsAsync(userId);
    }

}