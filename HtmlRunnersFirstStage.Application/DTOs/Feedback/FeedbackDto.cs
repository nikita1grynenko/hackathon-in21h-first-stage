namespace HtmlRunnersFirstStage.Application.DTOs.Feedback;

public class FeedbackDto
{
    public Guid Id { get; set; }
    public Guid QuestId { get; set; }
    public Guid UserId { get; set; }
    public string UserEmail { get; set; } = null!;
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
}