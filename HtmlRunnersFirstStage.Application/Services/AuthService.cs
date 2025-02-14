using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Application.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
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

        private string GenerateJwtToken(ApplicationUser user)
        {
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new ArgumentNullException("Jwt:Key", "JWT ключ не знайдений у конфігурації.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.UserName ?? ""), // Додаємо Username
                new Claim("AvatarUrl", user.AvatarUrl ?? "") // Додаємо AvatarUrl
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:TokenLifetime"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
    }
}
