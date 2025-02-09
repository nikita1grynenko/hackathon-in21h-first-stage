using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs;
using HtmlRunnersFirstStage.Application.DTOs.Quest;
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

    [HttpPost]
    public async Task<IActionResult> CreateQuest([FromBody] CreateQuestDto questDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Извлекаем UserId из токена (он всегда должен быть в JWT)
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Не удалось получить ID пользователя.");

        var userId = Guid.Parse(userIdClaim);

        // Передаем userId в сервис
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
    public async Task<IActionResult> GetAllQuests([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _questService.GetAllQuestsAsync(page, pageSize);
        return Ok(result);
    }
}