using AutoMapper;
using FitnessTracker.API.Data;
using FitnessTracker.Entities;
using FitnessTracker.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.API.Services
{
    public class GoalService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GoalService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GoalDto>> GetAllAsync()
        {
            var goals = await _context.Goals.ToListAsync();
            return _mapper.Map<IEnumerable<GoalDto>>(goals);
        }

        public async Task<GoalDto?> GetByIdAsync(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            return goal == null ? null : _mapper.Map<GoalDto>(goal);
        }

        public async Task<GoalDto> CreateAsync(GoalDto dto)
        {
            var goal = _mapper.Map<Goal>(dto);
            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();
            return _mapper.Map<GoalDto>(goal);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null) return false;

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

