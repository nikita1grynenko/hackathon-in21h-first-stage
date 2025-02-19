using HtmlRunnersFirstStage.Application.DTOs.Auth;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IUserService
{
    Task<UserProfileDto?> GetUserProfileAsync(Guid userId);
}