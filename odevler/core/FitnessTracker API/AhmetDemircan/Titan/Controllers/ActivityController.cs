using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Titan.Models;
using Titan.Utils;
using Microsoft.AspNetCore.Authorization;
using Titan.Dto.GoalDto;
using System.Security.Claims;

namespace Titan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    [Tags("2. Activity")]
    public class ActivityController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ActivityController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/activity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activitys>>> GetAll()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var activities = await _dbContext.Activities
                .Where(a => a.UserId == currentUserId)
                .AsNoTracking()
                .ToListAsync();
            return Ok(activities);
        }

        // GET: api/activity/{id}
        [HttpGet("{id:long}")]
        public async Task<ActionResult<Activitys>> GetById(long id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var activity = await _dbContext.Activities
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == currentUserId);
            if (activity == null) return NotFound();
            return Ok(activity);
        }


        // GET: api/activity/by-aim/{aimId}
        [HttpGet("by-aim/{aimId:long}")]
        public async Task<ActionResult<Activitys>> GetByAim(long aimId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var aim = await _dbContext.Aims
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == aimId && a.UserId == currentUserId);
            if (aim == null) return NotFound("Aim not found");
            
            var activity = await _dbContext.Activities
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == aim.ActivityGoalId && a.UserId == currentUserId);
            if (activity == null) return NotFound("Activity not found for aim");
            return Ok(activity);
        }


        // POST: api/activity
        [HttpPost]
        public async Task<ActionResult<Activitys>> Create([FromBody] AimAddDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var userId = long.Parse(userIdClaim);

            var activity = new Activitys
            {
                Activity = request.Activity,
                UserId = userId, // UserId eklendi
                CreatedAt = request.CreatedAt,
                ValidUntil = DateTime.Now.AddDays(request.DurationInDays)
            };
            _dbContext.Activities.Add(activity);
            await _dbContext.SaveChangesAsync();

            var aim = new Aim
            {
                Goal = request.Activity,
                UserId = userId,
                ActivityGoalId = activity.Id,
                IsCompleted = false,
                DurationInDays = request.DurationInDays
            };
            _dbContext.Aims.Add(aim);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = activity.Id }, activity);
        }

        // PUT: api/activity/{id}
        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] ActivityUpdateRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var activity = await _dbContext.Activities
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == currentUserId);
            if (activity == null) return NotFound();
            
            if (!string.IsNullOrWhiteSpace(request.Activity))
            {
                activity.Activity = request.Activity;
            }
            if (request.ValidUntil.HasValue)
            {
                activity.ValidUntil = request.ValidUntil.Value;
            }
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/activity/{id}
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User id not found in token");
            }
            var currentUserId = long.Parse(userIdClaim);

            var activity = await _dbContext.Activities
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == currentUserId);
            if (activity == null) return NotFound();
            
            _dbContext.Activities.Remove(activity);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        public class ActivityUpdateRequest
        {
            public string? Activity { get; set; }
            public DateTime? ValidUntil { get; set; }
        }
    }
}