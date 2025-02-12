using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class TaskOption
{
    public Guid Id { get; set; }
    public Guid TaskId { get; set; }
    [JsonIgnore]
    public QuestTask Task { get; set; } = null!;

    [Required, MaxLength(500)]
    public string Text { get; set; } = null!;
    
    [JsonIgnore]
    public bool IsCorrect { get; set; }  
}