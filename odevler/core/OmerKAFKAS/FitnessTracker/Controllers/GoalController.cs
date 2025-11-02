using FitnessTracker.API.Services;
using FitnessTracker.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTracker.API.Controllers
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GoalDto>>> GetAll()
        {
            var goals = await _goalService.GetAllAsync();
            return Ok(goals);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GoalDto>> GetById(int id)
        {
            var goal = await _goalService.GetByIdAsync(id);
            return goal == null ? NotFound() : Ok(goal);
        }

        [HttpPost]
        public async Task<ActionResult<GoalDto>> Create(GoalDto dto)
        {
            var created = await _goalService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _goalService.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}

