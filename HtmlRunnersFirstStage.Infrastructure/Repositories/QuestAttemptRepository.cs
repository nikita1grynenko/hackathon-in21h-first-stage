using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;

namespace HtmlRunnersFirstStage.Infrastructure.Repositories;

public class QuestAttemptRepository : IQuestAttemptRepository
{
    private readonly AppDbContext _context;

    public QuestAttemptRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddQuestAttemptAsync(QuestAttempt attempt)
    {
        _context.QuestAttempts.Add(attempt);
        await _context.SaveChangesAsync();
    }
}