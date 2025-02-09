using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IQuestAttemptService
{
    Task<AttemptResultDto> SubmitAttemptAsync(Guid userId, SubmitAttemptDto attemptDto);
    Task<List<QuestAttempt>> GetUserAttemptsAsync(Guid userId);
}