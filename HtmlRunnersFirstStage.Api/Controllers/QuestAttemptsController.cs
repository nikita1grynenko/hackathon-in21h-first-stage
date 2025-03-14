﻿using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs.QuestAttempt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HtmlRunnersFirstStage.API.Controllers;

[Authorize]
[ApiController]
[Route("api/quest-attempts")]
public class QuestAttemptsController : ControllerBase
{
    private readonly IQuestAttemptService _questAttemptService;

    public QuestAttemptsController(IQuestAttemptService questAttemptService)
    {
        _questAttemptService = questAttemptService;
    }
    
    [Authorize]
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitAttempt([FromBody] SubmitAttemptDto attemptDto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Failed to retrieve the user ID.");

        var userId = Guid.Parse(userIdClaim);

        var result = await _questAttemptService.SubmitAttemptAsync(userId, attemptDto);

        return Ok(result);
    }
    
    [Authorize]
    [HttpGet("user")]
    public async Task<IActionResult> GetUserAttempts()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        Console.WriteLine(userIdClaim);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Failed to retrieve the user ID.");

        var userId = Guid.Parse(userIdClaim);
        var attempts = await _questAttemptService.GetUserAttemptsAsync(userId);

        return Ok(attempts);
    }
}
