namespace HtmlRunnersFirstStage.Domain.Entites;

public abstract class TaskBase
{
    public int Id { get; set; }
    public string Question { get; set; }
    
    public int QuestId { get; set; }
    public Quest Quest { get; set; }
}