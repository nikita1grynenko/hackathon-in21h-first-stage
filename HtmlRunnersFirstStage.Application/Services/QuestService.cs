using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;

namespace HtmlRunnersFirstStage.Application.Services;

public class QuestService : IQuestService
{
    private readonly IQuestRepository _questRepository;

    public QuestService(IQuestRepository questRepository)
    {
        _questRepository = questRepository;
    }

    public async Task<Quest> CreateQuestAsync(CreateQuestDto questDto, Guid userId)
    {
        var quest = new Quest
        {
            Id = Guid.NewGuid(),
            Title = questDto.Title,
            Description = questDto.Description,
            QuestScore = questDto.QuestScore,
            TimeLimit = questDto.TimeLimit,
            CreatedByUserId = userId,  // Привязываем к юзеру из токена
            QuestTasks = questDto.Tasks.Select(taskDto => new QuestTask
            {
                Id = Guid.NewGuid(),
                Title = taskDto.Title,
                Description = taskDto.Description,
                QuestionType = taskDto.QuestionType,
                Options = taskDto.Options.Select(optionDto => new TaskOption
                {
                    Id = Guid.NewGuid(),
                    Text = optionDto.Text,
                    IsCorrect = optionDto.IsCorrect
                }).ToList()
            }).ToList()
        };

        return await _questRepository.AddQuestAsync(quest);
    }

    public async Task<Quest?> GetQuestByIdAsync(Guid id)
    {
        return await _questRepository.GetQuestByIdAsync(id);
    }
}