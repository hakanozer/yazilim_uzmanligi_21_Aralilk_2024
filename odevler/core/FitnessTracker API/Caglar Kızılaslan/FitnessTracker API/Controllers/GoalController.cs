using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using FitnessTracker_API.Dto.Goal;
using FitnessTracker_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTracker_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class GoalController : ControllerBase
    {
        private readonly GoalService _goalService;

        public GoalController(GoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpGet("list")]
        [ProducesResponseType(typeof(List<GoalResponseDto>), 200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<List<GoalResponseDto>>> GetAllGoals()
        {
            var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var goals = await _goalService.GetAllGoalsAsync(userId);
            return Ok(goals);
        }

        [HttpGet("details/{id}")]
        [ProducesResponseType(typeof(GoalResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<GoalResponseDto>> GetGoalById(long id)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var goal = await _goalService.GetGoalByIdAsync(id, userId);
                return Ok(goal);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("create")]
        [ProducesResponseType(typeof(GoalResponseDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<GoalResponseDto>> CreateGoal(GoalAddDto goalDto)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var goal = await _goalService.AddGoalAsync(goalDto, userId);
                return CreatedAtAction(nameof(GetGoalById), new { id = goal.Gid }, goal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        [ProducesResponseType(typeof(GoalResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<GoalResponseDto>> UpdateGoal(GoalUpdateDto goalDto)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var goal = await _goalService.UpdateGoalAsync(goalDto, userId);
                return Ok(goal);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteGoal(long id)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var result = await _goalService.DeleteGoalAsync(id, userId);
                return Ok(new { Success = result });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("update-progress/{id}")]
        [ProducesResponseType(typeof(GoalResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<GoalResponseDto>> UpdateGoalProgress(long id, [FromBody] int newValue)
        {
            try
            {
                var userId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var goal = await _goalService.UpdateGoalProgressAsync(id, newValue, userId);
                return Ok(goal);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}