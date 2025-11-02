using AutoMapper;
using Microsoft.EntityFrameworkCore;
using FitnessTracker.Data;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;

namespace FitnessTracker.Services;

public class GoalService : IGoalService
{
    private readonly FitnessTrackerDbContext _context;
    private readonly IMapper _mapper;

    public GoalService(FitnessTrackerDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<GoalResponseDto>> GetAllGoalsAsync(int userId)
    {
        var goals = await _context.Goals
            .Where(g => g.UserId == userId)
            .ToListAsync();

        return _mapper.Map<IEnumerable<GoalResponseDto>>(goals);
    }

    public async Task<GoalResponseDto> GetGoalByIdAsync(int id, int userId)
    {
        var goal = await _context.Goals
            .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);

        if (goal == null)
        {
            throw new KeyNotFoundException("Goal not found");
        }

        return _mapper.Map<GoalResponseDto>(goal);
    }

    public async Task<GoalResponseDto> CreateGoalAsync(GoalCreateDto createDto, int userId)
    {
        var goal = _mapper.Map<Goal>(createDto);
        goal.UserId = userId;

        _context.Goals.Add(goal);
        await _context.SaveChangesAsync();

        return _mapper.Map<GoalResponseDto>(goal);
    }

    public async Task<GoalResponseDto> UpdateGoalAsync(int id, GoalUpdateDto updateDto, int userId)
    {
        var goal = await _context.Goals
            .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);

        if (goal == null)
        {
            throw new KeyNotFoundException("Goal not found");
        }

        _mapper.Map(updateDto, goal);
        await _context.SaveChangesAsync();

        return _mapper.Map<GoalResponseDto>(goal);
    }

    public async Task<bool> DeleteGoalAsync(int id, int userId)
    {
        var goal = await _context.Goals
            .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);

        if (goal == null)
        {
            throw new KeyNotFoundException("Goal not found");
        }

        _context.Goals.Remove(goal);
        await _context.SaveChangesAsync();

        return true;
    }
}

