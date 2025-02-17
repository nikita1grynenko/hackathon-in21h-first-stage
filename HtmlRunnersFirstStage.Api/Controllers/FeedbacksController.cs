using System.Security.Claims;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.DTOs.Feedback;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HtmlRunnersFirstStage.Api.Controllers;

[ApiController]
[Route("api/feedbacks")]
public class FeedbacksController : ControllerBase
{
    private readonly IFeedbackService _feedbackService;

    public FeedbacksController(IFeedbackService feedbackService)
    {
        _feedbackService = feedbackService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> AddFeedback([FromBody] CreateFeedbackDto feedbackDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Не вдалося отримати ID користувача.");

        var userId = Guid.Parse(userIdClaim);
        var feedback = await _feedbackService.AddFeedbackAsync(feedbackDto, userId);

        return CreatedAtAction(nameof(GetFeedbacksByQuestId), new { questId = feedback.QuestId }, feedback);
    }

    [HttpGet("quest/{questId}")]
    public async Task<IActionResult> GetFeedbacksByQuestId(Guid questId)
    {
        var feedbacks = await _feedbackService.GetFeedbacksByQuestIdAsync(questId);
        return Ok(feedbacks);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetFeedbackById(Guid id)
    {
        var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
        if (feedback == null)
        {
            return NotFound(new { message = "Відгук не знайдено" });
        }

        return Ok(feedback);
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFeedback(Guid id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Не вдалося отримати ID користувача.");

        var userId = Guid.Parse(userIdClaim);
        var result = await _feedbackService.DeleteFeedbackAsync(id, userId);

        if (!result)
            return NotFound("Фідбек не знайдено або ви не маєте прав на його видалення.");

        return NoContent();
    }
}