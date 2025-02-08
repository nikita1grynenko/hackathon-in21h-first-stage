namespace HtmlRunnersFirstStage.Domain.Entities;

public class AttemptedTask
{
    public Guid Id { get; set; }

    public Guid QuestAttemptId { get; set; }
    public QuestAttempt QuestAttempt { get; set; } = null!;

    public Guid TaskId { get; set; }
    public QuestTask Task { get; set; } = null!;
    
    // Коли саме була зроблена спроба
    public DateTime AttemptedAt { get; set; } = DateTime.UtcNow;
}