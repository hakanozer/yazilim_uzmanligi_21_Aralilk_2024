using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessRestApi.Models;
using FitnessRestApi.Utils;
using Microsoft.AspNetCore.Authorization;

namespace FitnessRestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkoutController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Workout>>> GetAllWorkouts()
        {
            var workouts = await _context.Workouts
                .Include(w => w.User) // Kullanıcı ilişkisini getir (isteğe bağlı)
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            return Ok(workouts);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(int id)
        {
            var workout = await _context.Workouts
                .Include(w => w.User)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (workout == null)
                return NotFound();

            return Ok(workout);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Workout>> CreateWorkout([FromBody] Workout workout)
        {
            if (workout == null)
                return BadRequest("Workout verisi boş olamaz.");

            // Varsayılan tarih yoksa UTC now ata
            if (workout.Date == default)
                workout.Date = DateTime.UtcNow;

            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();

            // 201 Created döndür (CreatedAtAction)
            return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, workout);
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateWorkout(int id, [FromBody] Workout updatedWorkout)
        {
            if (id != updatedWorkout.Id)
                return BadRequest("ID eşleşmiyor.");

            var existingWorkout = await _context.Workouts.FindAsync(id);
            if (existingWorkout == null)
                return NotFound();

            existingWorkout.Type = updatedWorkout.Type;
            existingWorkout.DurationMinutes = updatedWorkout.DurationMinutes;
            existingWorkout.CaloriesBurned = updatedWorkout.CaloriesBurned;
            existingWorkout.Date = updatedWorkout.Date;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
                return NotFound();

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        
    }
}

