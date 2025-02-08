namespace HtmlRunnersFirstStage.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string AvatarUrl { get; set; }
    
    public ICollection<QuestAttempt> QuestAttempts { get; set; }
    public ICollection<Quest> CreatedQuests { get; set; }
    public ICollection<Feedback> Feedbacks { get; set; }
}