using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Domain.Enums;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Repositories;

public class QuestRepository : IQuestRepository
{
    private readonly AppDbContext _context;

    public QuestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Quest> AddQuestAsync(Quest quest)
    {
        _context.Quests.Add(quest);
        await _context.SaveChangesAsync();
        return quest;
    }

    public async Task<Quest?> GetQuestByIdAsync(Guid id)
    {
        return await _context.Quests
            .Include(q => q.QuestTasks)
            .ThenInclude(t => t.Options)
            .Include(q => q.QuestTasks)
            .ThenInclude(t => t.Media) // Додаємо медіафайли
            .Include(q => q.Feedbacks)
            .FirstOrDefaultAsync(q => q.Id == id);
    }
    
    public async Task<(List<Quest>, int)> GetAllQuestsAsync(int page, int pageSize, DifficultyLevel? difficulty)
    {
        var query = _context.Quests.AsQueryable();

        // Фільтр за рівнем складності, якщо він переданий
        if (difficulty.HasValue)
        {
            query = query.Where(q => q.Difficulty == difficulty.Value);
        }

        var totalCount = await query.CountAsync();
        var quests = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (quests, totalCount);
    }
    
    public async Task DeleteQuestAsync(Quest quest)
    {
        _context.Quests.Remove(quest);
        await _context.SaveChangesAsync();
    }
    
    public async Task<int> GetTotalQuestsCountAsync()
    {
        return await _context.Quests.CountAsync();
    }
}