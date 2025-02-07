namespace HtmlRunnersFirstStage.Domain.Entites;

public class TaskOption
{
    public Guid Id { get; set; }
    public string OptionText { get; set; }
    public bool IsCorrect { get; set; }

    public Guid QuestTaskId { get; set; }
    public QuestTask QuestTask { get; set; }
}