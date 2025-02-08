using System.ComponentModel.DataAnnotations;
using HtmlRunnersFirstStage.Domain.Enums;

namespace HtmlRunnersFirstStage.Domain.Entities;

public class QuestTask
{
    public Guid Id { get; set; }

    // Зв'язок із Quest
    public Guid QuestId { get; set; }
    public Quest Quest { get; set; } = null!;

    [Required, MaxLength(200)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    // Тип завдання (SingleChoice, MultipleChoice, OpenAnswer)
    public QuestionType QuestionType { get; set; }

    // Для OpenAnswer можна зберігати правильну відповідь (або залишити NULL)
    public string? CorrectAnswer { get; set; }

    // Обмеження часу саме для цього завдання (необов'язкове)
    public TimeSpan? TimeLimit { get; set; }

    // Навігаційні властивості
    public ICollection<TaskOption> Options { get; set; } = new List<TaskOption>();
    public ICollection<TaskMedia> Media { get; set; } = new List<TaskMedia>();
}