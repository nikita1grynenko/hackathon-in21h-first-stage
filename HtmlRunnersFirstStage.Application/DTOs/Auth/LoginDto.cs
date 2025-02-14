using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Application.DTOs.Auth;

public class LoginDto
{
    [Required]
    public string Email { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
}