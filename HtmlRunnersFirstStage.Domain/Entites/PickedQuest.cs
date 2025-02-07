namespace HtmlRunnersFirstStage.Domain.Entites;

public class PickedQuest
{
    public Guid Id { get; set; }
    
    public Guid QuestId { get; set; }
    public Quest Quest { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }
}