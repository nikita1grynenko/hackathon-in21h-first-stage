using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Repositories;

public class FeedbackRepository : IFeedbackRepository
{
    private readonly AppDbContext _context;

    public FeedbackRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Feedback> AddFeedbackAsync(Feedback feedback)
    {
        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();
        return feedback;
    }

    public async Task<List<Feedback>> GetFeedbacksByQuestIdAsync(Guid questId)
    {
        return await _context.Feedbacks
            .Where(f => f.QuestId == questId)
            .Include(f => f.User) // Включаємо інформацію про користувача
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();
    }
    
    public async Task DeleteFeedbackAsync(Feedback feedback)
    {
        _context.Feedbacks.Remove(feedback);
        await _context.SaveChangesAsync();
    }
    
    public async Task<Feedback?> GetFeedbackByIdAsync(Guid feedbackId)
    {
        return await _context.Feedbacks
            .Include(f => f.User) // Підключаємо юзера для отримання email
            .FirstOrDefaultAsync(f => f.Id == feedbackId);
    }
}