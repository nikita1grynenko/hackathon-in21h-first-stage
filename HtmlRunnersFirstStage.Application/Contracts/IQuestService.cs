using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
using HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;
using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IQuestService
{
    Task<Quest> CreateQuestAsync(CreateQuestDto questDto, Guid userId);
    Task<Quest?> GetQuestByIdAsync(Guid id);
    Task<PagedResponseDto<QuestDto>> GetAllQuestsAsync(int page, int pageSize, DifficultyLevel? difficulty);
    Task<bool> DeleteQuestAsync(Guid questId, Guid userId);
    Task<int> GetTotalQuestsCountAsync();
}