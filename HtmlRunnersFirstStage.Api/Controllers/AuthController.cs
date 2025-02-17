using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using HtmlRunnersFirstStage.Application.DTOs.Auth;
using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

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
    }
}