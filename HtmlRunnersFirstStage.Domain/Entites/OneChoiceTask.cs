namespace HtmlRunnersFirstStage.Domain.Entites;

public class OneChoiceTask : TaskBase
{
    public List<string> Options { get; set; } 
    public string CorrectOption { get; set; }
}