using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using HtmlRunnersFirstStage.Application.DTOs.Auth;
using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace HtmlRunnersFirstStage.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _authService;

        public AuthController(UserManager<ApplicationUser> userManager,IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var (token, error) = await _authService.RegisterAsync(model);

            if (error != null)
            {
                return BadRequest(new { Message = "Registration failed", Errors = error });
            }

            return Ok(new { token });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            
            var token = await _authService.LoginAsync(model);
            if (token == null) return Unauthorized( new { massege = "Invalid email or password." });
            return Ok(new { token });
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
                return BadRequest(new { message = "Помилка при видаленні користувача", errors = result.Errors });
            }

            return Ok(new { message = "Користувача успішно видалено" });
        }
        
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized(new { message = "Не вдалося отримати ID користувача" });

            var userId = Guid.Parse(userIdClaim);
            var userProfile = await _authService.GetUserProfileAsync(userId);

            if (userProfile == null)
                return NotFound(new { message = "Користувача не знайдено" });

            return Ok(userProfile);
        }
    }
}