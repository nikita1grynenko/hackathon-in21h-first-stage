using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Application.DTOs.Auth;

public class RegisterDto
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
    
    [Required, MaxLength(50)]
    public string Username { get; set; } = null!;
}