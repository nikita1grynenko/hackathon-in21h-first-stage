using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class Quest
{
    public Guid Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
    
    public int QuestScore { get; set; }

    // Якщо є загальне обмеження часу на квест (необов'язкове)
    public int TimeLimit { get; set; }
    
    // Хто створив квест
    public Guid CreatedByUserId { get; set; }
    public ApplicationUser CreatedByUser { get; set; } = null!;

    // Навігаційні властивості
    public ICollection<QuestTask> QuestTasks { get; set; } = new List<QuestTask>();
    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
}