using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WorkoutGoalApi.Dto.GoalDto; // DTO namespace'iniz
using WorkoutGoalApi.Models;
using WorkoutGoalApi.Utils;
using System.Security.Claims;

namespace WorkoutGoalApi.Services
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

        // --- Helper Metot ---
        private long GetCurrentUserId()
        {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !long.TryParse(userIdString, out var userId))
            {
                throw new Exception("Kullanıcı kimliği token içinde bulunamadı. Lütfen giriş yapın.");
            }
            return userId;
        }

        // --- Create (Oluşturma) ---
        public async Task<GoalDto> CreateGoalAsync(CreateGoalDto createDto)
        {
            var userId = GetCurrentUserId(); 
            var goal = _mapper.Map<Goal>(createDto); 

            goal.UserId = userId; //Hedefi kullanıcıya ata
            
            //DTO'da olmayan varsayılan değerleri ata
            goal.CurrentValue = 0; 
            goal.IsCompleted = false; 

            await _dbContext.Goals.AddAsync(goal);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<GoalDto>(goal); //Sonucu DTO olarak dön
        }

        //Kullanıcının Tüm Hedefleri
        public async Task<List<GoalDto>> GetMyGoalsAsync()
        {
            var userId = GetCurrentUserId();

            var goals = await _dbContext.Goals
                                      .Where(g => g.UserId == userId)
                                      .ToListAsync();

            return _mapper.Map<List<GoalDto>>(goals);
        }

        //Kullanıcının Tek Bir Hedefi
        public async Task<GoalDto?> GetGoalByIdAsync(int goalId)
        {
            var userId = GetCurrentUserId();

            var goal = await _dbContext.Goals
                .FirstOrDefaultAsync(g => g.GId == goalId && g.UserId == userId); 

            return _mapper.Map<GoalDto>(goal); 
        }

        public async Task<GoalDto?> UpdateGoalAsync(int goalId, UpdateGoalDto updateDto)
        {
            var userId = GetCurrentUserId();

            var goalFromDb = await _dbContext.Goals
                .FirstOrDefaultAsync(g => g.GId == goalId && g.UserId == userId);

            if (goalFromDb == null)
            {
                return null; 
            }
            _mapper.Map(updateDto, goalFromDb);
            goalFromDb.IsCompleted = (goalFromDb.CurrentValue >= goalFromDb.TargetValue);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<GoalDto>(goalFromDb);
        }

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