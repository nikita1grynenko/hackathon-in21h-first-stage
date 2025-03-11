using System.ComponentModel.DataAnnotations;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class TaskMediaDto
{
    [Required, Url(ErrorMessage = "Invalid URL format.")]
    public string Url { get; set; } = null!;

    [Required]
    public MediaType MediaType { get; set; }
}