namespace HtmlRunnersFirstStage.Domain.Entities;

public class AnswerOption
{
    public Guid Id { get; set; }
    
    public Guid TaskId { get; set; }
    public QuestTask QuestTask { get; set; }
    
    public string OptionText { get; set; }
    public bool IsCorrect { get; set; }
}