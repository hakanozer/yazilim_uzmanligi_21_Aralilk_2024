using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkoutGoalApi.Dto.WorkoutDto;
using WorkoutGoalApi.Services; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WorkoutGoalApi.Controllers
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

        [HttpGet("allList")]
        public async Task<ActionResult<List<WorkoutDto>>> GetMyWorkouts()
        {
            // 3. Controller'da mantık olmaz, sadece servis çağrılır.
            var workouts = await _workoutService.GetMyWorkoutsAsync();
            return Ok(workouts);
        }

        // Belirtilen ID'ye sahip ve o anki kullanıcıya ait egzersizi getirir.
        [HttpGet("/{id}")]
        public async Task<ActionResult<WorkoutDto>> GetWorkoutById(int id)
        {
            var workout = await _workoutService.GetWorkoutByIdAsync(id);

            // 4. Servis null dönerse (ya bulunamadı ya da o kullanıcıya ait değil)
            if (workout == null)
            {
                return NotFound(); // 404 Not Found
            }

            return Ok(workout);
        }

        // O anki kullanıcı için yeni bir egzersiz kaydı oluşturur.
        [HttpPost("create")]
        public async Task<IActionResult> CreateWorkout(CreateWorkoutDto createDto)
        {
            var newWorkout = await _workoutService.CreateWorkoutAsync(createDto);

            // 5. API'de en iyi pratik, 201 Created ile yeni nesnenin yerini dönmektir.
            return CreatedAtAction(nameof(GetWorkoutById), new { id = newWorkout.WId }, newWorkout);
        }

    
        // O anki kullanıcıya ait bir egzersiz kaydını günceller.
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateWorkout(int id, UpdateWorkoutDto updateDto)
        {
            var updatedWorkout = await _workoutService.UpdateWorkoutAsync(id, updateDto);

            // 6. Güncellenecek kayıt bulunamadıysa (veya o kullanıcıya ait değilse)
            if (updatedWorkout == null)
            {
                return NotFound(); // 404 Not Found
            }

            return Ok(updatedWorkout); // 200 OK
        }

    
        // O anki kullanıcıya ait bir egzersiz kaydını siler.
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var result = await _workoutService.DeleteWorkoutAsync(id);

            // 7. Silinecek kayıt bulunamadıysa (veya o kullanıcıya ait değilse)
            if (result == false)
            {
                return NotFound(); // 404 Not Found
            }

            return NoContent(); // 204 No Content (Başarılı silme)
        }
    }
}