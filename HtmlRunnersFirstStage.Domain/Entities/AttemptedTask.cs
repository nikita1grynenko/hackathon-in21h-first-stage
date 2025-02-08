namespace HtmlRunnersFirstStage.Domain.Entities;

public class AttemptedTask
{
    public Guid Id { get; set; }

    public Guid QuestAttemptId { get; set; }
    public QuestAttempt QuestAttempt { get; set; } = null!;

    public Guid TaskId { get; set; }
    public QuestTask Task { get; set; } = null!;

    // Для завдань типу OpenAnswer (відкрита відповідь)
    public string? UserAnswer { get; set; }

    // Показує, чи правильно користувач відповів (для відображення результату)
    public bool IsCorrect { get; set; }

    // Коли саме була зроблена спроба
    public DateTime AttemptedAt { get; set; } = DateTime.UtcNow;

    // Варіанти, які користувач обрав (для SingleChoice/MultipleChoice)
    public ICollection<AttemptedTaskOption> AttemptedTaskOptions { get; set; } 
        = new List<AttemptedTaskOption>();
}