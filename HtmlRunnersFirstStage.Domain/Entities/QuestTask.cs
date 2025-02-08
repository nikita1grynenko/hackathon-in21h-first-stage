using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class QuestTask
{
    public Guid Id { get; set; }
    
    public Guid QuestId { get; set; }
    public Quest Quest { get; set; }
    
    public string Title { get; set; }
    public string Description { get; set; }
    
    public int TaskTypeId { get; set; }
    public TaskType TaskType { get; set; }
    
    public string MediaUrl { get; set; }
    
    public ICollection<AnswerOption> AnswerOptions { get; set; }
}