using AutoMapper;
using FitnessRestApi.Dto;
using FitnessRestApi.Models;
using FitnessRestApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace FitnessRestApi.Services
{
    public class GoalService
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public GoalService(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<GoalDto> CreateAsync(int userId, GoalDto dto)
        {
            var entity = _mapper.Map<Goal>(dto);
            entity.UserId = userId;
            _db.Goals.Add(entity);
            await _db.SaveChangesAsync();
            return _mapper.Map<GoalDto>(entity);
        }

        public async Task<bool> DeleteAsync(int userId, int id)
        {
            var item = await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            if (item == null) return false;
            _db.Goals.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<GoalDto>> GetAllAsync(int userId)
        {
            var list = await _db.Goals.Where(g => g.UserId == userId).ToListAsync();
            return _mapper.Map<IEnumerable<GoalDto>>(list);
        }

        public async Task<GoalDto?> GetByIdAsync(int userId, int id)
        {
            var item = await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            if (item == null) return null;
            return _mapper.Map<GoalDto>(item);
        }

        public async Task<bool> UpdateAsync(int userId, int id, GoalDto dto)
        {
            var item = await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            if (item == null) return false;
            item.Title = dto.Title;
            item.TargetValue = dto.TargetValue;
            item.DueDate = dto.DueDate;
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateProgressAsync(int userId, int id, double progressDelta)
        {
            var item = await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            if (item == null) return false;

            item.CurrentValue += progressDelta;
            if (item.CurrentValue >= item.TargetValue)
            {
                item.IsCompleted = true;
                item.CurrentValue = item.TargetValue;
            }

            await _db.SaveChangesAsync();
            return true;
        }
    }
}
