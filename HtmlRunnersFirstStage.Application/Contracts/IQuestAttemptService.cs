using HtmlRunnersFirstStage.Application.DTOs;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IQuestAttemptService
{
    Task<AttemptResultDto> SubmitAttemptAsync(Guid userId, SubmitAttemptDto attemptDto);

}