namespace HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;

public class AttemptResultDto
{
    public int Score { get; set; } // Итоговый балл пользователя
    public Dictionary<Guid, string> CorrectTasks { get; set; } = new(); // TaskId -> "true", "partiallyTrue", "false"
    public Dictionary<Guid, List<string>> CorrectAnswers { get; set; } = new(); // TaskId -> Правильные ответы
}

