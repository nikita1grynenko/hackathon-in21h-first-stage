using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IQuestRepository
{
    Task<Quest> AddQuestAsync(Quest quest);
    Task<Quest?> GetQuestByIdAsync(Guid id);
}