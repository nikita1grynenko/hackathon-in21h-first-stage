using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
using HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;
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
            CreatedByUserId = userId,
            Difficulty = questDto.Difficulty, 
            Topic = questDto.Topic,
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
    
    public async Task<PagedResponseDto<QuestDto>> GetAllQuestsAsync(int page, int pageSize)
    {
        var (quests, totalCount) = await _questRepository.GetAllQuestsAsync(page, pageSize);

        var questDtos = quests.Select(q => new QuestDto
        {
            Id = q.Id,
            Title = q.Title,
            Description = q.Description,
            QuestScore = q.QuestScore,
            TimeLimit = q.TimeLimit,
            CreatedByUserId = q.CreatedByUserId,
            CreatedByUsername = q.CreatedByUser.UserName,
        }).ToList();

        return new PagedResponseDto<QuestDto>
        {
            Items = questDtos,
            TotalCount = totalCount,
            PageNumber = page,
            PageSize = pageSize
        };
    }
    
    public async Task<bool> DeleteQuestAsync(Guid questId, Guid userId)
    {
        var quest = await _questRepository.GetQuestByIdAsync(questId);
        if (quest == null)
            return false; // Квест не знайдено

        if (quest.CreatedByUserId != userId)
            throw new UnauthorizedAccessException("Ви можете видаляти тільки свої квести.");

        await _questRepository.DeleteQuestAsync(quest);
        return true;
    }
    
    public async Task<int> GetTotalQuestsCountAsync()
    {
        return await _questRepository.GetTotalQuestsCountAsync();
    }
}