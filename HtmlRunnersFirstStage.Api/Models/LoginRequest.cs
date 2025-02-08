using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Api.Models;

public class LoginRequest
{
    [Required]
    public string Email { get; set; } = null!;
        
    [Required]
    public string Password { get; set; } = null!;
}