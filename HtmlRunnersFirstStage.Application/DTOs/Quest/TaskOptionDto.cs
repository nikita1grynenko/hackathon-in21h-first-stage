using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class TaskOptionDto
{
    [Required, StringLength(200, MinimumLength = 1)]
    public string Text { get; set; } = null!;

    public bool IsCorrect { get; set; }
}