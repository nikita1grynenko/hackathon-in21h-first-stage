using HtmlRunnersFirstStage.Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using HtmlRunnersFirstStage.Application.DTOs.Auth;

namespace HtmlRunnersFirstStage.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
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
    }
}