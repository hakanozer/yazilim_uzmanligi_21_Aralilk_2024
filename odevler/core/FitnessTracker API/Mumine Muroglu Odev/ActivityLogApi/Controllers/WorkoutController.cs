using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ActivityLogApi.Dto.WorkoutDto;
using ActivityLogApi.Services; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActivityLogApi.Controllers
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


        [HttpGet("list")]
        public async Task<ActionResult<List<WorkoutDto>>> GetMyWorkouts()
        {
            var workouts = await _workoutService.GetMyWorkoutsAsync();
            return Ok(workouts);
        }

        // Belirtilen ID'ye sahip ve o anki kullanıcıya ait egzersizi getirme
        [HttpGet("list/{id}")]
        public async Task<ActionResult<WorkoutDto>> GetWorkoutById(int id)
        {
            var workout = await _workoutService.GetWorkoutByIdAsync(id);
            if (workout == null)
            {
                return NotFound(); 
            }
            return Ok(workout);
        }

     
        //Kullanıcı için yeni bir egzersiz kaydı oluşturma
        [HttpPost("add")]
        public async Task<IActionResult> AddWorkout(WorkoutCreateDto createDto)
        {
            var newWorkout = await _workoutService.CreateWorkoutAsync(createDto);
            return CreatedAtAction(nameof(GetWorkoutById), new { id = newWorkout.WId }, newWorkout);
        }

        
        // Kullanıcıya ait bir egzersiz kaydını güncelleme
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateWorkout(int id, WorkoutUpdateDto updateDto)
        {
            var updatedWorkout = await _workoutService.UpdateWorkoutAsync(id, updateDto);
            if (updatedWorkout == null)
            {
                return NotFound(); 
            }
            return Ok(updatedWorkout); 
        }

       
        //Kullanıcıya ait bir egzersiz kaydını silme  
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var result = await _workoutService.DeleteWorkoutAsync(id);
            if (result == false)
            {
                return NotFound(); 
            }
            return NoContent(); 
        }
    }
}
