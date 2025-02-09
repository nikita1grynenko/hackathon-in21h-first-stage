using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IQuestAttemptRepository
{
    Task AddQuestAttemptAsync(QuestAttempt attempt);
    Task<List<QuestAttempt>> GetUserAttemptsAsync(Guid userId);
}