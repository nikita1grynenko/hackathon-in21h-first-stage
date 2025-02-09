namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IAuthenticationService
{
    /// <summary>
    /// Реєстрація користувача через email із створенням профілю.
    /// </summary>
    Task<string?> RegisterAsync(string email, string password, string userName);
        
    /// <summary>
    /// Логін користувача через email та пароль.
    /// </summary>
    Task<string?> LoginAsync(string email, string password);
}