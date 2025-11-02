using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using ActivityLogApi.Utils;
using ActivityLogApi.Dto.WorkoutDto;
using ActivityLogApi.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace ActivityLogApi.Services
{
    public class WorkoutService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public WorkoutService(ApplicationDbContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }


        // Token'ı okuyup o anki kullanıcının ID'sini (long) getiren metot
        private long GetCurrentUserId()
        {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !long.TryParse(userIdString, out var userId))
            {
                throw new Exception("Kullanıcı kimliği token içinde bulunamadı. Lütfen giriş yapın.");
            }
            return userId;
        }

        // Egzersiz Ekleme
        public async Task<WorkoutDto> CreateWorkoutAsync(WorkoutCreateDto workoutCreateDto)
        {
            var userId = GetCurrentUserId();
            var workout = _mapper.Map<Workout>(workoutCreateDto);
            workout.UserId = userId; //Workout'u o kullanıcıya ata
            await _dbContext.Workouts.AddAsync(workout);//Veritabanına ekle
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<WorkoutDto>(workout);
        }


        // Kullanıcıya ait egzersizler
        public async Task<List<WorkoutDto>> GetMyWorkoutsAsync()
        {
            var userId = GetCurrentUserId();
            var workouts = await _dbContext.Workouts
                                         .Where(w => w.UserId == userId)
                                         .ToListAsync();
            return _mapper.Map<List<WorkoutDto>>(workouts);
        }


        // Egzersiz Güncelleme
        public async Task<WorkoutDto?> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto updateDto)
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

        //Id 'ye Egzersiz Getirme
        public async Task<WorkoutDto?> GetWorkoutByIdAsync(int workoutId)
        {
            var userId = GetCurrentUserId();
            var workout = await _dbContext.Workouts
                .FirstOrDefaultAsync(w => w.WId == workoutId && w.UserId == userId);

            return _mapper.Map<WorkoutDto>(workout);
        }
        

        //Egzersiz Silme
        public async Task<bool> DeleteWorkoutAsync(int workoutId)
        {
            var userId = GetCurrentUserId();
            var workout = await _dbContext.Workouts
                .FirstOrDefaultAsync(w => w.WId == workoutId && w.UserId == userId);
            if (workout == null)
            {
                return false; 
            }
            _dbContext.Workouts.Remove(workout);
            await _dbContext.SaveChangesAsync();
            return true;
            
        }


    }
}
