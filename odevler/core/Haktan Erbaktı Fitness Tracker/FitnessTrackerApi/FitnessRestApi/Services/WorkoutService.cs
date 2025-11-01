using AutoMapper;
using FitnessRestApi.Dto;
using FitnessRestApi.Models;
using FitnessRestApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerApi.Services
{
    public class WorkoutService
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public WorkoutService(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<WorkoutDto> CreateAsync(int userId, WorkoutDto dto)
        {
            var entity = _mapper.Map<Workout>(dto);
            entity.UserId = userId;

            _db.Workouts.Add(entity);
            await _db.SaveChangesAsync();

            // ✅ Kullanıcının aktif hedefini bul
            var activeGoal = await _db.Goals.FirstOrDefaultAsync(g => g.UserId == userId && !g.IsCompleted);
            if (activeGoal != null)
            {
                // Workout’tan gelen veriye göre ilerleme ekle
                activeGoal.CurrentValue += entity.CaloriesBurned;

                // Hedef tamamlandı mı?
                if (activeGoal.CurrentValue >= activeGoal.TargetValue)
                {
                    activeGoal.IsCompleted = true;
                }

                await _db.SaveChangesAsync();
            }

            return _mapper.Map<WorkoutDto>(entity);
        }


        public async Task<bool> DeleteAsync(int userId, int id)
        {
            var item = await _db.Workouts.FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);
            if (item == null) return false;
            _db.Workouts.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<WorkoutDto>> GetAllAsync(int userId)
        {
            var list = await _db.Workouts.Where(w => w.UserId == userId).OrderByDescending(w => w.Date).ToListAsync();
            return _mapper.Map<IEnumerable<WorkoutDto>>(list);
        }

        public async Task<WorkoutDto?> GetByIdAsync(int userId, int id)
        {
            var item = await _db.Workouts.FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);
            if (item == null) return null;
            return _mapper.Map<WorkoutDto>(item);
        }

        public async Task<bool> UpdateAsync(int userId, int id, WorkoutDto dto)
        {
            var item = await _db.Workouts.FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);
            if (item == null) return false;

            item.Type = dto.Type;
            item.DurationMinutes = dto.DurationMinutes;
            item.CaloriesBurned = dto.CaloriesBurned;
            item.Date = dto.Date.GetValueOrDefault(item.Date);

            await _db.SaveChangesAsync();
            return true;
        }
    }


}
