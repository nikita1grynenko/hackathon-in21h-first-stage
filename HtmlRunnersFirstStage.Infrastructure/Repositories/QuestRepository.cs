using HtmlRunnersFirstStage.Domain.Entities;
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
            .FirstOrDefaultAsync(q => q.Id == id);
    }
}