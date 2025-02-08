namespace HtmlRunnersFirstStage.Domain.Entities;

public class QuestAttempt
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid QuestId { get; set; }
    public Quest Quest { get; set; }

    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }

    public double Score { get; set; }
    public bool IsCompleted { get; set; }
    
    public ICollection<UserQuestTaskAnswer> UserQuestTaskAnswers { get; set; }
}