using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class TaskMediaDto
{
    public string Url { get; set; } = null!;
    public MediaType MediaType { get; set; }
}