namespace HtmlRunnersFirstStage.Domain.Entities;

public class UserQuestTaskAnswer
{
    public Guid Id { get; set; }

    public Guid QuestAttemptId { get; set; }
    public QuestAttempt QuestAttempt { get; set; }

    public Guid TaskId { get; set; }
    public QuestTask Task { get; set; }

    public string AnswerText { get; set; } // Для відкритих відповідей
    public bool IsCorrect { get; set; } // Чи правильна відповідь

    public ICollection<UserAnswerOption> SelectedOptions { get; set; } // Для SingleChoice та MultipleChoice
}
