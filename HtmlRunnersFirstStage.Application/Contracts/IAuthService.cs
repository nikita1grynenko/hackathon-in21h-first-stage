﻿using HtmlRunnersFirstStage.Application.DTOs.Auth;

namespace HtmlRunnersFirstStage.Application.Contracts;

public interface IAuthService
{
    Task<string?> RegisterAsync(RegisterDto model);
    Task<string?> LoginAsync(LoginDto model);
}