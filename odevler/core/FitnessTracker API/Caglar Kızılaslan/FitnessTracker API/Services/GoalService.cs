using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FitnessTracker_API.Dto.Goal;
using FitnessTracker_API.Models;
using FitnessTracker_API.Utils;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker_API.Services
{
    public class GoalService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GoalService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GoalResponseDto>> GetAllGoalsAsync(long userId)
        {
            var goals = await _context.Goals
                .Where(g => g.UserId == userId)
                .ToListAsync();

            return _mapper.Map<List<GoalResponseDto>>(goals);
        }

        public async Task<GoalResponseDto> GetGoalByIdAsync(long goalId, long userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Gid == goalId && g.UserId == userId);

            if (goal == null)
                throw new Exception("Hedef bulunamadı");

            return _mapper.Map<GoalResponseDto>(goal);
        }

        public async Task<GoalResponseDto> AddGoalAsync(GoalAddDto goalDto, long userId)
        {
            var goal = _mapper.Map<Goal>(goalDto);
            goal.UserId = userId;
            goal.CreatedAt = DateTime.Now;

            await _context.Goals.AddAsync(goal);
            await _context.SaveChangesAsync();

            return _mapper.Map<GoalResponseDto>(goal);
        }

        public async Task<GoalResponseDto> UpdateGoalAsync(GoalUpdateDto goalDto, long userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Gid == goalDto.Gid && g.UserId == userId);

            if (goal == null)
                throw new Exception("Hedef bulunamadı");

            // Güncelleme işlemi
            goal.Title = goalDto.Title;
            goal.Description = goalDto.Description;
            goal.GoalType = goalDto.GoalType;
            goal.TargetValue = goalDto.TargetValue;
            goal.CurrentValue = goalDto.CurrentValue;
            goal.Unit = goalDto.Unit;
            goal.StartDate = goalDto.StartDate;
            goal.EndDate = goalDto.EndDate;
            goal.IsCompleted = goalDto.IsCompleted;
            goal.UpdatedAt = DateTime.Now;

            // Hedef tamamlandı mı kontrolü
            if (goal.CurrentValue >= goal.TargetValue)
            {
                goal.IsCompleted = true;
            }

            _context.Goals.Update(goal);
            await _context.SaveChangesAsync();

            return _mapper.Map<GoalResponseDto>(goal);
        }

        public async Task<bool> DeleteGoalAsync(long goalId, long userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Gid == goalId && g.UserId == userId);

            if (goal == null)
                throw new Exception("Hedef bulunamadı");

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<GoalResponseDto> UpdateGoalProgressAsync(long goalId, int newValue, long userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Gid == goalId && g.UserId == userId);

            if (goal == null)
                throw new Exception("Hedef bulunamadı");

            goal.CurrentValue = newValue;
            goal.UpdatedAt = DateTime.Now;

            // Hedef tamamlandı mı kontrolü
            if (goal.CurrentValue >= goal.TargetValue)
            {
                goal.IsCompleted = true;
            }

            _context.Goals.Update(goal);
            await _context.SaveChangesAsync();

            return _mapper.Map<GoalResponseDto>(goal);
        }
    }
}