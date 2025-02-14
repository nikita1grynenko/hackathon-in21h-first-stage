using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Application.DTOs.Feedback;

public class CreateFeedbackDto
{
    [Required]
    public Guid QuestId { get; set; }

    [Range(1, 5)]
    public int Rating { get; set; }

    [StringLength(2000)]
    public string? Comment { get; set; }
}