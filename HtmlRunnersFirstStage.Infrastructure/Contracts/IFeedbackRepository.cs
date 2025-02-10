using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IFeedbackRepository
{
    Task<Feedback> AddFeedbackAsync(Feedback feedback);
    Task<List<Feedback>> GetFeedbacksByQuestIdAsync(Guid questId);
    Task DeleteFeedbackAsync(Feedback feedback);
    Task<Feedback?> GetFeedbackByIdAsync(Guid feedbackId);
}