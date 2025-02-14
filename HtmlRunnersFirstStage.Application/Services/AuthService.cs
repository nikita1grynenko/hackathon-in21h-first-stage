using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Application.Contracts;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HtmlRunnersFirstStage.Application.DTOs.Auth;
using HtmlRunnersFirstStage.Infrastructure.Contracts;

namespace HtmlRunnersFirstStage.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<string?> RegisterAsync(RegisterDto model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await _userRepository.RegisterAsync(user, model.Password);
    
            if (!result.Succeeded)
            {
                // Логуємо помилку Identity
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                Console.WriteLine($"Помилка реєстрації: {errors}");
                return null;
            }

            // Генеруємо JWT
            var token = GenerateJwtToken(user);
            return token;
        }

        public async Task<string?> LoginAsync(LoginDto model)
        {
            var user = await _userRepository.FindByEmailAsync(model.Email);
            if (user == null || !await _userRepository.CheckPasswordAsync(user, model.Password))
                return null;

            return GenerateJwtToken(user);
        }
        
        public async Task<UserProfileDto?> GetUserProfileAsync(Guid userId)
        {
            var user = await _userRepository.FindByIdAsync(userId);
            if (user == null) return null;

            return new UserProfileDto
            {
                Id = user.Id,
                Username = user.UserName!,
                Email = user.Email!,
                AvatarUrl = user.AvatarUrl
            };
        }
        
        private string GenerateJwtToken(ApplicationUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY") ?? throw new InvalidOperationException()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim("AvatarUrl", user.AvatarUrl ?? "")
            };

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("JWT_AUD"),
                claims: claims,
                expires: DateTime.UtcNow.AddHours(Convert.ToDouble(Environment.GetEnvironmentVariable("JWT_LIFETIME"))),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
