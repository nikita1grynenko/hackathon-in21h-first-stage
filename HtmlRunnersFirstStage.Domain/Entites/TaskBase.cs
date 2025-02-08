using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Domain.Entites;

public abstract class TaskBase
{
    public Guid Id { get; set; }
    public string Question { get; set; }
    
    public Guid QuestId { get; set; }
    public Quest Quest { get; set; }
    
    public TaskType TaskType { get; set; }
}