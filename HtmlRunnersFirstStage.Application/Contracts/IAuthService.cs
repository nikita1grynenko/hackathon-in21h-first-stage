using HtmlRunnersFirstStage.Application.DTOs.Auth;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IAuthService
{
    Task<(string? Token, string? Error)> RegisterAsync(RegisterDto model);
    Task<string?> LoginAsync(LoginDto model);
    Task<UserProfileDto?> GetUserProfileAsync(Guid userId);
}