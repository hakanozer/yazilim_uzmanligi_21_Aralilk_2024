using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ActivityLogApi.Dto.GoalDto; 
using ActivityLogApi.Models;
using ActivityLogApi.Utils;
using System.Security.Claims;

namespace ActivityLogApi.Services
{
    public class GoalService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GoalService(
            ApplicationDbContext dbContext, 
            IMapper mapper, 
            IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

      
        private long GetCurrentUserId()
        {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !long.TryParse(userIdString, out var userId))
            {
                throw new Exception("Kullanıcı kimliği token içinde bulunamadı. Lütfen giriş yapın.");
            }
            return userId;
        }

        // Hedef Ekleme
        public async Task<GoalDto> CreateGoalAsync(GoalCreateDto createDto)
        {
            var userId = GetCurrentUserId(); // Kullanıcıyı bul
            var goal = _mapper.Map<Goal>(createDto);
            goal.UserId = userId; //Hedefi kullanıcıya ata

            // 4. DTO'da olmayan varsayılan değerleri ata
            goal.CurrentValue = 0;
            goal.IsCompleted = false;

            await _dbContext.Goals.AddAsync(goal);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<GoalDto>(goal);
        }
        

        // Tüm hedefleri getiren hedef
        public async Task<List<GoalDto>> GetMyGoalsAsync()
        {
            var userId = GetCurrentUserId();
            var goals = await _dbContext.Goals
                                      .Where(g => g.UserId == userId)
                                      .ToListAsync();
            return _mapper.Map<List<GoalDto>>(goals);
        }


        // Kullanıcının Tek Bir Hedefi
        public async Task<GoalDto?> GetGoalByIdAsync(int goalId)
        {
            var userId = GetCurrentUserId();
            // Modelinizdeki GId isimlendirmesine göre sorgu:
            var goal = await _dbContext.Goals
                .FirstOrDefaultAsync(g => g.GId == goalId && g.UserId == userId);
            return _mapper.Map<GoalDto>(goal); // Bulamazsa null döner
        }
        

        // Hedef Güncelleme 
        public async Task<GoalDto?> UpdateGoalAsync(int goalId, GoalUpdateDto updateDto)
        {
            var userId = GetCurrentUserId();
            var goalFromDb = await _dbContext.Goals
                .FirstOrDefaultAsync(g => g.GId == goalId && g.UserId == userId);

            if (goalFromDb == null)
            {
                return null;
            }

            // DTO'daki bilgileri veritabanındaki nesneye işliyoruz
            _mapper.Map(updateDto, goalFromDb);
            goalFromDb.IsCompleted = (goalFromDb.CurrentValue >= goalFromDb.TargetValue);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<GoalDto>(goalFromDb);
        }
        
        // Hedef Silme
        public async Task<bool> DeleteGoalAsync(int goalId)
        {
            var userId = GetCurrentUserId();
            var goal = await _dbContext.Goals
                .FirstOrDefaultAsync(g => g.GId == goalId && g.UserId == userId);
            if (goal == null)
            {
                return false; 
            }
            _dbContext.Goals.Remove(goal);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
