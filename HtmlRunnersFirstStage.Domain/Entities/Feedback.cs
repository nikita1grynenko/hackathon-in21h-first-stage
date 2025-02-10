using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class Feedback
{
    public Guid Id { get; set; }

    // До якого квесту належить рейтинг
    public Guid QuestId { get; set; }
    public Quest Quest { get; set; } = null!;

    // Користувач, який залишив відгук
    public Guid UserId { get; set; }
    
    public ApplicationUser User { get; set; } = null!;

    // Оцінка (наприклад 1..5)
    [Range(1, 5)]
    public int Rating { get; set; }

    // Коментар (не обов'язковий)
    [MaxLength(2000)]
    public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}