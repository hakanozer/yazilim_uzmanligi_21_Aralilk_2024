using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Titan.Models;
using Titan.Utils;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Titan.Dto.GoalDto;

namespace Titan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    [Tags("3. Aim")]
    public class AimController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public AimController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/aim
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aim>>> GetAll()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var aims = await _dbContext.Aims
                .AsNoTracking()
                .Where(a => a.UserId == currentUserId)
                .ToListAsync();
            return Ok(aims);
        }

        // GET: api/aim/{id}
        [HttpGet("{id:long}")]
        public async Task<ActionResult<Aim>> GetById(long id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var aim = await _dbContext.Aims
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == currentUserId);
            if (aim == null) return NotFound();
            return Ok(aim);
        }

        // POST: api/aim
        [HttpPost]
        public async Task<ActionResult<Aim>> Create([FromBody] AimAddDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            // Validate foreign keys - AimAddDto'da ActivityGoalId yok, bu yüzden bu kontrolü kaldırıyoruz
            
            var aim = new Aim
            {
                Goal = request.Activity, // AimAddDto'da Activity field'ı var
                UserId = currentUserId,
                ActivityGoalId = 1, // Varsayılan değer veya başka bir mantık
                IsCompleted = request.IsCompleted,
                DurationInDays = request.DurationInDays
            };

            _dbContext.Aims.Add(aim);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = aim.Id }, aim);
        }

        // PUT: api/aim/{id}
        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] AimAddDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var aim = await _dbContext.Aims
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == currentUserId);
            if (aim == null) return NotFound();

            aim.Goal = request.Activity ?? aim.Goal; // AimAddDto'da Activity field'ı var
            // userId güncellemesi JWT'den geldiği için dışarıdan değiştirilmez
            // AimAddDto'da ActivityGoalId yok, bu yüzden bu kontrolü kaldırıyoruz
            aim.IsCompleted = request.IsCompleted;
            aim.DurationInDays = request.DurationInDays;

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/aim/{id}
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var aim = await _dbContext.Aims
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == currentUserId);
            if (aim == null) return NotFound();

            _dbContext.Aims.Remove(aim);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}