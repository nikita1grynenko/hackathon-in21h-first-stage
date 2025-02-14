namespace HtmlRunnersFirstStage.Application.DTOs.Quest;

public class QuestDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int QuestScore { get; set; }
    public int TimeLimit { get; set; }
    
    public Guid CreatedByUserId { get; set; }
    public string? CreatedByUsername { get; set; } = string.Empty; // Додаємо Username
}