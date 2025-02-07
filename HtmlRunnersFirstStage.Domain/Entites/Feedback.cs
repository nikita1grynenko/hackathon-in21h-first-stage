namespace HtmlRunnersFirstStage.Domain.Entites;

public class Feedback
{
    public Guid Id { get; set; }
    public int Rating { get; set; } 
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid QuestId { get; set; }
    public Quest Quest { get; set; }
}