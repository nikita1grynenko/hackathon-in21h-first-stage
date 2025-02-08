namespace HtmlRunnersFirstStage.Domain.Entities;

public class TaskType
{
    public int Id { get; set; }
    public string Name { get; set; } // Single Choice, Multiple Choice, Open Answer
    public ICollection<QuestTask> QuestTasks { get; set; }
}