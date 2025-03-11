using System.ComponentModel.DataAnnotations;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class CreateQuestDto
{
    [Required, StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [Range(1, 1000, ErrorMessage = "Quest score must be between 1 and 1000.")]
    public int QuestScore { get; set; }

    [Range(1, 1440, ErrorMessage = "Time limit must be between 1 and 1440 minutes.")]
    public int TimeLimit { get; set; }

    [Required]
    public DifficultyLevel Difficulty { get; set; }

    [Required]
    public Topic Topic { get; set; }

    [Required, MinLength(1, ErrorMessage = "At least one task is required.")]
    public List<QuestTaskDto> Tasks { get; set; } = new();
}