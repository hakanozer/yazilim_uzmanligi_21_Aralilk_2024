using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkoutGoalApi.Dto.GoalDto; 
using WorkoutGoalApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WorkoutGoalApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
        public class GoalController : ControllerBase
    {
        private readonly GoalService _goalService;

        public GoalController(GoalService goalService)
        {
            _goalService = goalService;
        }

        //giriş yapmış kullanıcıya ait tüm hedefleri getir
        [HttpGet("allList")]
        public async Task<ActionResult<List<GoalDto>>> GetMyGoals()
        {
            var goals = await _goalService.GetMyGoalsAsync();
            return Ok(goals);
        }

        //Belirtilen ID'ye sahip hedefi getirir.
        [HttpGet("{id}")]
        public async Task<ActionResult<GoalDto>> GetGoalById(int id)
        {
            var goal = await _goalService.GetGoalByIdAsync(id);

            if (goal == null)
            {
                return NotFound(); // 404 Not Found
            }

            return Ok(goal);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateGoal(CreateGoalDto createDto)
        {
            var newGoal = await _goalService.CreateGoalAsync(createDto);

            return CreatedAtAction(nameof(GetGoalById), new { id = newGoal.GId }, newGoal);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateGoal(int id, UpdateGoalDto updateDto)
        {
            var updatedGoal = await _goalService.UpdateGoalAsync(id, updateDto);

            if (updatedGoal == null)
            {
                return NotFound(); // 404 Not Found
            }

            return Ok(updatedGoal); // 200 OK
        }
    
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            var result = await _goalService.DeleteGoalAsync(id);

            if (result == false)
            {
                return NotFound(); 
            }

            return NoContent(); 
        }
    }
}