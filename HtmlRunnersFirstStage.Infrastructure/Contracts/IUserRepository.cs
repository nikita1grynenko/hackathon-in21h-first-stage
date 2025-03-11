using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IUserRepository
{
    Task<ApplicationUser?> FindByEmailAsync(string email);
    Task<IdentityResult> RegisterAsync(ApplicationUser user, string password);
    Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
    Task<ApplicationUser?> FindByIdAsync(Guid userId);
}