using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IQuestService
{
    Task<Quest> CreateQuestAsync(CreateQuestDto questDto, Guid userId);
    Task<Quest?> GetQuestByIdAsync(Guid id);
}