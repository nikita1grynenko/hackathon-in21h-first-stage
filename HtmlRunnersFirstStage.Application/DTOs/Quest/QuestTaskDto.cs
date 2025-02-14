using System.ComponentModel.DataAnnotations;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class QuestTaskDto
{
    [Required, StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [Required]
    public QuestionType QuestionType { get; set; }

    [Required, MinLength(1, ErrorMessage = "At least one option is required.")]
    public List<TaskOptionDto> Options { get; set; } = new();

    public List<TaskMediaDto> Media { get; set; } = new();
}