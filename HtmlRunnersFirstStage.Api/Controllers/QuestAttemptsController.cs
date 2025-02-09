﻿using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HtmlRunnersFirstStage.API.Controllers;

[ApiController]
[Route("api/quest-attempts")]
public class QuestAttemptsController : ControllerBase
{
    private readonly IQuestAttemptService _questAttemptService;

    public QuestAttemptsController(IQuestAttemptService questAttemptService)
    {
        _questAttemptService = questAttemptService;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitAttempt([FromBody] SubmitAttemptDto attemptDto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Не удалось получить ID пользователя.");

        var userId = Guid.Parse(userIdClaim);

        var result = await _questAttemptService.SubmitAttemptAsync(userId, attemptDto);

        return Ok(result);
    }
}
