using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    [Required, MaxLength(100)]
    public string Email { get; set; } = null!;

    [Required, MaxLength(200)]
    public string PasswordHash { get; set; } = null!;

    [Required, MaxLength(50)]
    public string UserName { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    // Навігаційні властивості
    public ICollection<Quest> QuestsCreated { get; set; } = new List<Quest>();
    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    public ICollection<QuestAttempt> QuestAttempts { get; set; } = new List<QuestAttempt>();
}