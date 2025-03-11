using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Application.DTOs.Auth;

public class RegisterDto
{
    [Required, EmailAddress, StringLength(100)]
    public string Email { get; set; } = null!;

    [Required, StringLength(50, MinimumLength = 6)]
    public string Password { get; set; } = null!;

    [Required, StringLength(50)]
    public string Username { get; set; } = null!;
}