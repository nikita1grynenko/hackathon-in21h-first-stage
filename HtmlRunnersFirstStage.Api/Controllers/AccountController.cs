using HtmlRunnersFirstStage.Api.Models;
using HtmlRunnersFirstStage.Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HtmlRunnersFirstStage.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        
        public AccountController(IAuthenticationService authService)
        {
            _authService = authService;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = await _authService.RegisterAsync(model.Email, model.Password, model.UserName);
            if (string.IsNullOrEmpty(token))
                return BadRequest("Registration failed.");

            return Ok(new { token });
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = await _authService.LoginAsync(model.Email, model.Password);
            if (string.IsNullOrEmpty(token))
                return Unauthorized("Invalid credentials.");

            return Ok(new { token });
        }
    }
}