using AutoMapper;
using FitnessTracker.API.Data;
using FitnessTracker.Entities;
using FitnessTracker.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.API.Services
{
    public class WorkoutService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WorkoutService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<WorkoutDto>> GetAllAsync()
        {
            var workouts = await _context.Workouts.ToListAsync();
            return _mapper.Map<IEnumerable<WorkoutDto>>(workouts);
        }

        public async Task<WorkoutDto?> GetByIdAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            return workout == null ? null : _mapper.Map<WorkoutDto>(workout);
        }

        public async Task<WorkoutDto> CreateAsync(WorkoutDto dto)
        {
            var workout = _mapper.Map<Workout>(dto);
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
            return _mapper.Map<WorkoutDto>(workout);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null) return false;

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

