using HtmlRunnersFirstStage.Domain.Entities;

namespace HtmlRunnersFirstStage.Infrastructure.Contracts;

public interface IUserRepository
{
    Task<ApplicationUser?> GetUserByIdAsync(Guid id);
    Task<ApplicationUser?> GetUserByEmailAsync(string email);
    Task UpdateUserAsync(ApplicationUser user);
}