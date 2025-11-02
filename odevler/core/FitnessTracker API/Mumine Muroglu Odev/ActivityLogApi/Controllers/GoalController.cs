using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ActivityLogApi.Dto.GoalDto;
using ActivityLogApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActivityLogApi.Controllers
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

        
        // Sadece o an giriş yapmış kullanıcıya ait hedefleri getirir.
       
        [HttpGet("list")]
        public async Task<ActionResult<List<GoalDto>>> UserGoals()
        {
            var goals = await _goalService.GetMyGoalsAsync();
            return Ok(goals);
        }

        // Belirtilen ID'ye sahip ve o anki kullanıcıya ait hedefi getirir.
        [HttpGet("{id}")]
        public async Task<ActionResult<GoalDto>> UserGoalById(int id)
        {
            var goal = await _goalService.GetGoalByIdAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            return Ok(goal);
        }

  
        //Kullanıcı için yeni bir hedef kaydı oluşturur.
        [HttpPost("add")]
        public async Task<IActionResult> AddGoal(GoalCreateDto createDto)
        {
            var newGoal = await _goalService.CreateGoalAsync(createDto);
            return CreatedAtAction(nameof(UserGoalById), new { id = newGoal.GId }, newGoal);
        }

      
        //O anki kullanıcıya ait bir hedef kaydını günceller.
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateGoal(int id, GoalUpdateDto updateDto)
        {
            var updatedGoal = await _goalService.UpdateGoalAsync(id, updateDto);
            if (updatedGoal == null)
            {
                return NotFound(); 
            }
            return Ok(updatedGoal); 
        }

        
        //O anki kullanıcıya ait bir hedef kaydını siler.
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
