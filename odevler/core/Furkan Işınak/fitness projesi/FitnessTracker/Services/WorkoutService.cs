using AutoMapper;
using Microsoft.EntityFrameworkCore;
using FitnessTracker.Data;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;

namespace FitnessTracker.Services;

public class WorkoutService : IWorkoutService
{
    private readonly FitnessTrackerDbContext _context;
    private readonly IMapper _mapper;

    public WorkoutService(FitnessTrackerDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<WorkoutResponseDto>> GetAllWorkoutsAsync(int userId)
    {
        var workouts = await _context.Workouts
            .Where(w => w.UserId == userId)
            .ToListAsync();

        return _mapper.Map<IEnumerable<WorkoutResponseDto>>(workouts);
    }

    public async Task<WorkoutResponseDto> GetWorkoutByIdAsync(int id, int userId)
    {
        var workout = await _context.Workouts
            .FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);

        if (workout == null)
        {
            throw new KeyNotFoundException("Workout not found");
        }

        return _mapper.Map<WorkoutResponseDto>(workout);
    }

    public async Task<WorkoutResponseDto> CreateWorkoutAsync(WorkoutCreateDto createDto, int userId)
    {
        var workout = _mapper.Map<Workout>(createDto);
        workout.UserId = userId;

        _context.Workouts.Add(workout);
        await _context.SaveChangesAsync();

        return _mapper.Map<WorkoutResponseDto>(workout);
    }

    public async Task<WorkoutResponseDto> UpdateWorkoutAsync(int id, WorkoutUpdateDto updateDto, int userId)
    {
        var workout = await _context.Workouts
            .FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);

        if (workout == null)
        {
            throw new KeyNotFoundException("Workout not found");
        }

        _mapper.Map(updateDto, workout);
        await _context.SaveChangesAsync();

        return _mapper.Map<WorkoutResponseDto>(workout);
    }

    public async Task<bool> DeleteWorkoutAsync(int id, int userId)
    {
        var workout = await _context.Workouts
            .FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);

        if (workout == null)
        {
            throw new KeyNotFoundException("Workout not found");
        }

        _context.Workouts.Remove(workout);
        await _context.SaveChangesAsync();

        return true;
    }
}

