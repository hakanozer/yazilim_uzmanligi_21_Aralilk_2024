using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using FitnessTracker_API.Dto.Workout;
using FitnessTracker_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTracker_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkOutService _workoutService;

        public WorkoutController(WorkOutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpGet("list")]
        [ProducesResponseType(typeof(List<WorkoutResponseDto>), 200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<List<WorkoutResponseDto>>> GetAllWorkouts()
        {
            var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var workouts = await _workoutService.GetAllWorkoutsAsync(userId);
            return Ok(workouts);
        }

        [HttpGet("details/{id}")]
        [ProducesResponseType(typeof(WorkoutResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<WorkoutResponseDto>> GetWorkoutById(long id)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var workout = await _workoutService.GetWorkoutByIdAsync(id, userId);
                return Ok(workout);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("create")]
        [ProducesResponseType(typeof(WorkoutResponseDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<WorkoutResponseDto>> CreateWorkout(WorkoutAddDto workoutDto)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var workout = await _workoutService.AddWorkoutAsync(workoutDto, userId);
                return CreatedAtAction(nameof(GetWorkoutById), new { id = workout.Wid }, workout);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        [ProducesResponseType(typeof(WorkoutResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<WorkoutResponseDto>> UpdateWorkout(WorkoutUpdateDto workoutDto)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var workout = await _workoutService.UpdateWorkoutAsync(workoutDto, userId);
                return Ok(workout);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteWorkout(long id)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var result = await _workoutService.DeleteWorkoutAsync(id, userId);
                return Ok(new { Success = result });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}