using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessRestApi.Models;
using FitnessRestApi.Utils;
using Microsoft.AspNetCore.Authorization;

namespace FitnessRestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GoalController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoals()
        {
            var goals = await _context.Goals
                .Include(g => g.User)
                .ToListAsync();

            return Ok(goals);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Goal>> GetGoal(int id)
        {
            var goal = await _context.Goals
                .Include(g => g.User)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (goal == null)
                return NotFound();

            return Ok(goal);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<ActionResult<Goal>> CreateGoal([FromBody] Goal goal)
        {
            if (goal == null)
                return BadRequest("Goal ekleyiniz.");

            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();

            // 201 Created + yeni kaydın URL'si
            return CreatedAtAction(nameof(GetGoal), new { id = goal.Id }, goal);
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateGoal(int id, [FromBody] Goal updatedGoal)
        {
            if (id != updatedGoal.Id)
                return BadRequest("ID eşleşmiyor.");

            var existingGoal = await _context.Goals.FindAsync(id);
            if (existingGoal == null)
                return NotFound();

            existingGoal.Title = updatedGoal.Title;
            existingGoal.TargetValue = updatedGoal.TargetValue;
            existingGoal.CurrentValue = updatedGoal.CurrentValue;
            existingGoal.DueDate = updatedGoal.DueDate;
            existingGoal.IsCompleted = updatedGoal.IsCompleted;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
                return NotFound();

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpGet("progress/{userId}")]
        public async Task<IActionResult> GetGoalProgress(int userId)
        {
            var goal = await _context.Goals
                .Where(g => g.UserId == userId && !g.IsCompleted)
                .FirstOrDefaultAsync();

            if (goal == null)
                return Ok(new { message = "Aktif hedef bulunamadı." });

            // Yüzde hesabı
            var progressPercent = (goal.CurrentValue / goal.TargetValue) * 100;

            return Ok(new
            {
                goal.Id,
                goal.Title,
                goal.TargetValue,
                goal.CurrentValue,
                progressPercent = Math.Round(progressPercent, 2),
                isCompleted = goal.IsCompleted,
                dueDate = goal.DueDate
            });
        }

    }
}