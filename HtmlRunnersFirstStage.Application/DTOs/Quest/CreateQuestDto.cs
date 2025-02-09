namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class CreateQuestDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int QuestScore { get; set; }
    public int TimeLimit { get; set; }

    public List<QuestTaskDto> Tasks { get; set; } = new();
}