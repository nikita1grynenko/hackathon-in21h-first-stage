namespace HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;

public class SubmitAttemptDto
{
    public Guid QuestId { get; set; }

    public Dictionary<Guid, List<string>> Answers { get; set; } = new();
}