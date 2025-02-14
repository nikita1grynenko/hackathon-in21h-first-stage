using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRepository(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<ApplicationUser?> FindByEmailAsync(string email)
        => await _userManager.FindByEmailAsync(email);

    public async Task<IdentityResult> RegisterAsync(ApplicationUser user, string password)
        => await _userManager.CreateAsync(user, password);

    public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
        => await _userManager.CheckPasswordAsync(user, password);
    public async Task<ApplicationUser?> FindByIdAsync(Guid userId)
        => await _userManager.FindByIdAsync(userId.ToString());
}