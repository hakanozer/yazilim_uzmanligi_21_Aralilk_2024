using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FitnessTracker_API.Dto.Workout;
using FitnessTracker_API.Models;
using FitnessTracker_API.Utils;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker_API.Services
{
    public class WorkOutService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public WorkOutService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<WorkoutResponseDto>> GetAllWorkoutsAsync(long userId)
        {
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.WorkoutDate)
                .ToListAsync();

            return _mapper.Map<List<WorkoutResponseDto>>(workouts);
        }

        public async Task<WorkoutResponseDto> GetWorkoutByIdAsync(long workoutId, long userId)
        {
            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.Wid == workoutId && w.UserId == userId);

            if (workout == null)
                throw new Exception("Egzersiz bulunamadı");

            return _mapper.Map<WorkoutResponseDto>(workout);
        }

        public async Task<WorkoutResponseDto> AddWorkoutAsync(WorkoutAddDto workoutDto, long userId)
        {
            var workout = _mapper.Map<Workout>(workoutDto);
            workout.UserId = userId;
            workout.CreatedAt = DateTime.Now;
            // WorkoutDate set edilmemişse şu anki tarihi kullan
            if (workout.WorkoutDate == default(DateTime))
            {
                workout.WorkoutDate = DateTime.Now;
            }
            // Description ve CaloriesBurned için varsayılan değerler
            if (string.IsNullOrEmpty(workout.Description))
            {
                workout.Description = string.Empty;
            }
            // CaloriesBurned zaten int'in default değeri olan 0'dan başlayacak

            await _context.Workouts.AddAsync(workout);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutResponseDto>(workout);
        }

        public async Task<WorkoutResponseDto> UpdateWorkoutAsync(WorkoutUpdateDto workoutDto, long userId)
        {
            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.Wid == workoutDto.wid && w.UserId == userId);

            if (workout == null)
                throw new Exception("Egzersiz bulunamadı");

            // Güncelleme işlemi
            workout.ActivityName = workoutDto.ActivityName;
            workout.Description = workoutDto.Description;
            workout.ActivityType = workoutDto.ActivityType;
            workout.Duration = workoutDto.Duration;
            workout.CaloriesBurned = workoutDto.CaloriesBurned;
            workout.WorkoutDate = workoutDto.WorkoutDate;
            workout.UpdatedAt = DateTime.Now;

            _context.Workouts.Update(workout);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutResponseDto>(workout);
        }

        public async Task<bool> DeleteWorkoutAsync(long workoutId, long userId)
        {
            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.Wid == workoutId && w.UserId == userId);

            if (workout == null)
                throw new Exception("Egzersiz bulunamadı");

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}