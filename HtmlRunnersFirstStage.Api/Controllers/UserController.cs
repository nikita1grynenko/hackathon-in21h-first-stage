using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HtmlRunnersFirstStage.Api.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserService _userService;

    public UserController(UserManager<ApplicationUser> userManager, IUserService userService)
    {
        
        _userManager = userManager;
        _userService = userService;
    }
    
    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetUserProfile()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized(new { message = "Failed to retrieve the user ID." });

        var userId = Guid.Parse(userIdClaim);
        var userProfile = await _userService.GetUserProfileAsync(userId);

        if (userProfile == null)
            return NotFound(new { message = "User not found." });

        return Ok(userProfile);
    }
    
    [HttpDelete("{userId}")]
    public async Task<IActionResult> DeleteUser(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        var result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest(new { message = "Error deleting user.", errors = result.Errors });
        }

        return Ok(new { message = "User successfully deleted." });
    }
}