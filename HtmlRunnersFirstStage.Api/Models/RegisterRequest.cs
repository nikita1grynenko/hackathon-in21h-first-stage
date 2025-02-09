using System.ComponentModel.DataAnnotations;

namespace HtmlRunnersFirstStage.Api.Models;

public class RegisterRequest
{
    [Required]
    public string Email { get; set; } = null!;
        
    [Required]
    public string Password { get; set; } = null!;
        
    [Required]
    public string UserName { get; set; } = null!;
}