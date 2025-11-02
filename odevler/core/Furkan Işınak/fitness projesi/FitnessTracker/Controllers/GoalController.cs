using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FitnessTracker.DTOs;
using FitnessTracker.Services;

namespace FitnessTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GoalController : ControllerBase
{
    private readonly IGoalService _goalService;

    public GoalController(IGoalService goalService)
    {
        _goalService = goalService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GoalResponseDto>>> GetAllGoals()
    {
        var userId = GetUserId();
        var goals = await _goalService.GetAllGoalsAsync(userId);
        return Ok(goals);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GoalResponseDto>> GetGoal(int id)
    {
        try
        {
            var userId = GetUserId();
            var goal = await _goalService.GetGoalByIdAsync(id, userId);
            return Ok(goal);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<GoalResponseDto>> CreateGoal([FromBody] GoalCreateDto createDto)
    {
        try
        {
            var userId = GetUserId();
            var goal = await _goalService.CreateGoalAsync(createDto, userId);
            return CreatedAtAction(nameof(GetGoal), new { id = goal.Id }, goal);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<GoalResponseDto>> UpdateGoal(int id, [FromBody] GoalUpdateDto updateDto)
    {
        try
        {
            var userId = GetUserId();
            var goal = await _goalService.UpdateGoalAsync(id, updateDto, userId);
            return Ok(goal);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteGoal(int id)
    {
        try
        {
            var userId = GetUserId();
            await _goalService.DeleteGoalAsync(id, userId);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }

    private int GetUserId()
    {
        if (!User.Identity?.IsAuthenticated ?? true)
        {
            throw new UnauthorizedAccessException("User is not authenticated");
        }

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid user token");
        }
        return userId;
    }
}

