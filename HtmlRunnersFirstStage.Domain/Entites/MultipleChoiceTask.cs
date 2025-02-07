namespace HtmlRunnersFirstStage.Domain.Entites;

public class MultipleChoiceTask : TaskBase
{
    public List<string> Options { get; set; } 
    public List<string> CorrectOptions { get; set; }
}