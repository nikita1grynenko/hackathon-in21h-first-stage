using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
using HtmlRunnersFirstStage.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HtmlRunnersFirstStage.API.Controllers;

[ApiController]
[Route("api/quests")]
public class QuestsController : ControllerBase
{
     private readonly IQuestService _questService;

    public QuestsController(IQuestService questService)
    {
        _questService = questService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateQuest([FromBody] CreateQuestDto questDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Не вдалося отримати ID користувача.");

        var userId = Guid.Parse(userIdClaim);

        var quest = await _questService.CreateQuestAsync(questDto, userId);

        return CreatedAtAction(nameof(GetQuestById), new { id = quest.Id }, quest);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuestById(Guid id)
    {
        var quest = await _questService.GetQuestByIdAsync(id);
        if (quest == null)
            return NotFound();

        return Ok(quest);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllQuests(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] DifficultyLevel? difficulty = null // Використовуємо enum
        )
    {
        var result = await _questService.GetAllQuestsAsync(page, pageSize, difficulty);
        return Ok(result);
    }
    
    [HttpGet("total")]
    public async Task<IActionResult> GetTotalQuestsCount()
    {
        var totalQuests = await _questService.GetTotalQuestsCountAsync();
        return Ok(new { totalQuests });
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuest(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Не вдалося отримати ID користувача.");

        var userId = Guid.Parse(userIdClaim);
        var result = await _questService.DeleteQuestAsync(id, userId);

        if (!result)
            return NotFound("Квест не знайдено або ви не маєте прав на його видалення.");

        return NoContent(); // 204 No Content
    }
    
}