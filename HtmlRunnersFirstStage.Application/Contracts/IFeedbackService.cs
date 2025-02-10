using HtmlRunnersFirstStage.Application.DTOs.Feedback;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IFeedbackService
{
    Task<FeedbackDto> AddFeedbackAsync(CreateFeedbackDto feedbackDto, Guid userId);
    Task<List<FeedbackDto>> GetFeedbacksByQuestIdAsync(Guid questId);
    Task<bool> DeleteFeedbackAsync(Guid feedbackId, Guid userId);
    Task<FeedbackDto?> GetFeedbackByIdAsync(Guid feedbackId);
}