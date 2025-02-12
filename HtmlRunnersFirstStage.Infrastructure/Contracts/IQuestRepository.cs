using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IQuestRepository
{
    Task<Quest> AddQuestAsync(Quest quest);
    Task<Quest?> GetQuestByIdAsync(Guid id);
    Task<(List<Quest>, int)> GetAllQuestsAsync(int page, int pageSize, DifficultyLevel? difficulty);
    Task DeleteQuestAsync(Quest quest);
    Task<int> GetTotalQuestsCountAsync();
}