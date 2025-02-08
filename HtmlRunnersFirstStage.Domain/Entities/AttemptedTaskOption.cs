namespace HtmlRunnersFirstStage.Domain.Entities;

public class AttemptedTaskOption
{
    public Guid Id { get; set; }

    public Guid AttemptedTaskId { get; set; }
    public AttemptedTask AttemptedTask { get; set; } = null!;

    public Guid TaskOptionId { get; set; }
    public TaskOption TaskOption { get; set; } = null!;
}