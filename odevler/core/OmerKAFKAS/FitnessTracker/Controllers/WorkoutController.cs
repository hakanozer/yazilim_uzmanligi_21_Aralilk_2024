using FitnessTracker.API.Services;
using FitnessTracker.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutService _workoutService;

        public WorkoutController(WorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutDto>>> GetAll()
        {
            var workouts = await _workoutService.GetAllAsync();
            return Ok(workouts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutDto>> GetById(int id)
        {
            var workout = await _workoutService.GetByIdAsync(id);
            return workout == null ? NotFound() : Ok(workout);
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutDto>> Create(WorkoutDto dto)
        {
            var created = await _workoutService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _workoutService.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}

