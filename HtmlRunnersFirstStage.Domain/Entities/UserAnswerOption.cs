namespace HtmlRunnersFirstStage.Domain.Entities;

public class UserAnswerOption
{
    public Guid Id { get; set; }

    public Guid UserAnswerId { get; set; }
    public UserQuestTaskAnswer UserAnswer { get; set; }

    public Guid AnswerOptionId { get; set; }
    public AnswerOption AnswerOption { get; set; }
}
