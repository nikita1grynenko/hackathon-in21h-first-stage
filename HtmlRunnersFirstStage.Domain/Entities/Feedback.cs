using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class Feedback
{
    public Guid Id { get; set; }

    public Guid QuestId { get; set; }
    [JsonIgnore]
    public Quest Quest { get; set; } = null!;

    public Guid UserId { get; set; }
    
    public ApplicationUser User { get; set; } = null!;

    [Range(1, 5)]
    public int Rating { get; set; }

    [StringLength(2000)]
    public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public string UserName => User?.UserName ?? "Анонім";

}