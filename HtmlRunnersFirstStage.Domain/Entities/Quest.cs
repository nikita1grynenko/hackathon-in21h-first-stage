using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class Quest
{
    public Guid Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    // Якщо є загальне обмеження часу на квест (необов'язкове)
    public TimeSpan? GlobalTimeLimit { get; set; }

    // Хто створив квест
    public Guid CreatedByUserId { get; set; }
    public User CreatedByUser { get; set; } = null!;

    // Навігаційні властивості
    public ICollection<QuestTask> QuestTasks { get; set; } = new List<QuestTask>();
    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    public ICollection<QuestAttempt> QuestAttempts { get; set; } = new List<QuestAttempt>();
}