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
            var token = await _authService.RegisterAsync(model);
            if (token == null) return BadRequest("Помилка реєстрації.");
            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var token = await _authService.LoginAsync(model);
            if (token == null) return Unauthorized("Невірні данні.");
            return Ok(new { token });
        }
        
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return NotFound(new { message = "Користувача не знайдено" });
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Помилка при видаленні користувача", errors = result.Errors });
            }

            return Ok(new { message = "Користувача успішно видалено" });
        }
    }
}