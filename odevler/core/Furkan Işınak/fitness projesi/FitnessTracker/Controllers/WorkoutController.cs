using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FitnessTracker.DTOs;
using FitnessTracker.Services;

namespace FitnessTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorkoutController : ControllerBase
{
    private readonly IWorkoutService _workoutService;

    public WorkoutController(IWorkoutService workoutService)
    {
        _workoutService = workoutService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkoutResponseDto>>> GetAllWorkouts()
    {
        var userId = GetUserId();
        var workouts = await _workoutService.GetAllWorkoutsAsync(userId);
        return Ok(workouts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WorkoutResponseDto>> GetWorkout(int id)
    {
        try
        {
            var userId = GetUserId();
            var workout = await _workoutService.GetWorkoutByIdAsync(id, userId);
            return Ok(workout);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<WorkoutResponseDto>> CreateWorkout([FromBody] WorkoutCreateDto createDto)
    {
        try
        {
            var userId = GetUserId();
            var workout = await _workoutService.CreateWorkoutAsync(createDto, userId);
            return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, workout);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<WorkoutResponseDto>> UpdateWorkout(int id, [FromBody] WorkoutUpdateDto updateDto)
    {
        try
        {
            var userId = GetUserId();
            var workout = await _workoutService.UpdateWorkoutAsync(id, updateDto, userId);
            return Ok(workout);
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
    public async Task<ActionResult> DeleteWorkout(int id)
    {
        try
        {
            var userId = GetUserId();
            await _workoutService.DeleteWorkoutAsync(id, userId);
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

