using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs.Feedback;
using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Infrastructure.Contracts;

namespace HtmlRunnersFirstStage.Application.Services;

public class FeedbackService : IFeedbackService
{
    private readonly IFeedbackRepository _feedbackRepository;

    public FeedbackService(IFeedbackRepository feedbackRepository)
    {
        _feedbackRepository = feedbackRepository;
    }

    public async Task<FeedbackDto> AddFeedbackAsync(CreateFeedbackDto feedbackDto, Guid userId)
    {
        var feedback = new Feedback
        {
            Id = Guid.NewGuid(),
            QuestId = feedbackDto.QuestId,
            UserId = userId,
            Rating = feedbackDto.Rating,
            Comment = feedbackDto.Comment,
            CreatedAt = DateTime.UtcNow
        };

        var savedFeedback = await _feedbackRepository.AddFeedbackAsync(feedback);

        return new FeedbackDto
        {
            Id = savedFeedback.Id,
            QuestId = savedFeedback.QuestId,
            UserId = savedFeedback.UserId,
            Rating = savedFeedback.Rating,
            Comment = savedFeedback.Comment,
            CreatedAt = savedFeedback.CreatedAt
        };
    }

    public async Task<List<FeedbackDto>> GetFeedbacksByQuestIdAsync(Guid questId)
    {
        var feedbacks = await _feedbackRepository.GetFeedbacksByQuestIdAsync(questId);

        return feedbacks.Select(f => new FeedbackDto
        {
            Id = f.Id,
            QuestId = f.QuestId,
            UserId = f.UserId,
            Rating = f.Rating,
            Comment = f.Comment,
            CreatedAt = f.CreatedAt,
            UserName = f.User.UserName 
        }).ToList();
    }
    
    public async Task<bool> DeleteFeedbackAsync(Guid feedbackId, Guid userId)
    {
        var feedback = await _feedbackRepository.GetFeedbackByIdAsync(feedbackId);
        if (feedback == null)
            return false; // Фідбек не знайдено

        if (feedback.UserId != userId)
            throw new UnauthorizedAccessException("Ви можете видаляти тільки свої фідбеки.");

        await _feedbackRepository.DeleteFeedbackAsync(feedback);
        return true;
    }
    
    public async Task<FeedbackDto?> GetFeedbackByIdAsync(Guid feedbackId)
    {
        var feedback = await _feedbackRepository.GetFeedbackByIdAsync(feedbackId);
        if (feedback == null)
        {
            return null;
        }

        return new FeedbackDto
        {
            Id = feedback.Id,
            QuestId = feedback.QuestId,
            Rating = feedback.Rating,
            Comment = feedback.Comment,
            CreatedAt = feedback.CreatedAt,
            UserName = feedback.User?.UserName ?? "Анонім"
        };
    }
}