namespace HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;

public class PagedResponseDto<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}