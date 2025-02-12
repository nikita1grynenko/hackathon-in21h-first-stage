using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IQuestRepository
{
    Task<Quest> AddQuestAsync(Quest quest);
    Task<Quest?> GetQuestByIdAsync(Guid id);
    Task<(List<Quest>, int)> GetAllQuestsAsync(int page, int pageSize, string sortBy);
    Task DeleteQuestAsync(Quest quest);
    Task<int> GetTotalQuestsCountAsync();
}