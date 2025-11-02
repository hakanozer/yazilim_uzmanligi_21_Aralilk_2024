using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic; 
using System.Linq; 
using System.Security.Claims; 
using System.Threading.Tasks; 
using AutoMapper;
using Microsoft.AspNetCore.Http; 
using Microsoft.EntityFrameworkCore;
using WorkoutGoalApi.Utils;
using WorkoutGoalApi.Dto.WorkoutDto;
using WorkoutGoalApi.Models;

namespace WorkoutGoalApi.Services 
{
  
    public class WorkoutService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor; // Kullanıcıyı bulmak için

        public WorkoutService(
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

        public async Task<WorkoutDto> CreateWorkoutAsync(CreateWorkoutDto workoutCreateDto)
        {
            // O anki kullanıcıyı bul
            var userId = GetCurrentUserId();

            // DTO'yu Modele çevir
            var workout = _mapper.Map<Workout>(workoutCreateDto);

            // Workout'u o kullanıcıya ata
            workout.UserId = userId;

            //Veritabanına ekle
            await _dbContext.Workouts.AddAsync(workout);
            await _dbContext.SaveChangesAsync();

            //Sonucu DTO olarak dön
            return _mapper.Map<WorkoutDto>(workout);
        }

        public async Task<List<WorkoutDto>> GetMyWorkoutsAsync()
        {
            
            var userId = GetCurrentUserId();

            
            var workouts = await _dbContext.Workouts
                                         .Where(w => w.UserId == userId)
                                         .ToListAsync();

            return _mapper.Map<List<WorkoutDto>>(workouts);
        }
        public async Task<WorkoutDto?> UpdateWorkoutAsync(int workoutId, UpdateWorkoutDto updateDto)
        {
            var userId = GetCurrentUserId();
            var workoutFromDb = await _dbContext.Workouts
                .FirstOrDefaultAsync(w => w.WId == workoutId && w.UserId == userId);
            if (workoutFromDb == null)
            {
                return null;
            }
            _mapper.Map(updateDto, workoutFromDb);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<WorkoutDto>(workoutFromDb);
        }
        
        public async Task<WorkoutDto?> GetWorkoutByIdAsync(int workoutId)
        {
            var userId = GetCurrentUserId();
            var workout = await _dbContext.Workouts
                .FirstOrDefaultAsync(w => w.WId == workoutId && w.UserId == userId);
            
            return _mapper.Map<WorkoutDto>(workout); // Bulamazsa 'null' dönr
        }

        public async Task<bool> DeleteWorkoutAsync(int workoutId)
        {
            var userId = GetCurrentUserId();
            var workout = await _dbContext.Workouts
                .FirstOrDefaultAsync(w => w.WId == workoutId && w.UserId == userId);

            if (workout == null)
            {
                return false; // Silinecek bir şey bulunamadı
            }

            _dbContext.Workouts.Remove(workout);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}