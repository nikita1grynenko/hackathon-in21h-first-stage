using System.ComponentModel.DataAnnotations;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class TaskMedia
{
    public Guid Id { get; set; }

    public Guid TaskId { get; set; }
    public QuestTask Task { get; set; } = null!;

    [Required, MaxLength(500)]
    public string Url { get; set; } = null!;

    // Тип медіа
    public MediaType MediaType { get; set; }
}