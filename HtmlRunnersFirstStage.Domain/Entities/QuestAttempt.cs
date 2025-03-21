﻿namespace HtmlRunnersFirstStage.Domain.Entities;

public class QuestAttempt
{
    public Guid Id { get; set; }

    public Guid QuestId { get; set; }
    public Quest Quest { get; set; } = null!;
    
    public int UserScore { get; set; }

    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    // Час початку / завершення спроби
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    
    // **Додамо поле для юзернейму**
    public string UserName => User?.UserName ?? "Анонім";
}