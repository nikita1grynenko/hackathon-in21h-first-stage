using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class QuestTaskDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public QuestionType QuestionType { get; set; }

    public List<TaskOptionDto> Options { get; set; } = new();
}