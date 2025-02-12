using System.ComponentModel.DataAnnotations;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class Quest
{
    public Guid Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
        
    public int QuestScore { get; set; }

    public int TimeLimit { get; set; }

    public Guid CreatedByUserId { get; set; }
    public ApplicationUser CreatedByUser { get; set; } = null!;

    public ICollection<QuestTask> QuestTasks { get; set; } = new List<QuestTask>();
    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    // Додаємо рівень складності
    public DifficultyLevel Difficulty { get; set; }
    public Topic Topic { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}