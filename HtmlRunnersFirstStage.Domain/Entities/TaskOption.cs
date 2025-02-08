using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class TaskOption
{
    public Guid Id { get; set; }

    public Guid TaskId { get; set; }
    public QuestTask Task { get; set; } = null!;

    [Required, MaxLength(500)]
    public string Text { get; set; } = null!;

    public bool IsCorrect { get; set; }
}