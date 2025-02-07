namespace HtmlRunnersFirstStage.Domain.Entites;

public class Quest
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public TimeSpan TimeLimitMinutes { get; set; }
    public DateTime CreatedAt { get; set; }

    public Guid AuthorId { get; set; }
    public User Author { get; set; }

    public ICollection<TaskBase> Tasks { get; set; }
    public ICollection<Feedback> Feedbacks { get; set; }
}