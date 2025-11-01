namespace FitnessTracker.Services;
using FitnessTracker.Data;
using FitnessTracker.Entities;
using Microsoft.EntityFrameworkCore;


public class GoalService : IGoalService
{
    private readonly FitnessContext _db;

    public GoalService(FitnessContext db)
    {
        _db = db;
    }

    public async Task<List<Goal>> GetAllAsync(int userId)
    {
        return await _db.Goals
            .Where(g => g.UserId == userId)
            .OrderByDescending(g => g.Id)
            .ToListAsync();
    }

    public async Task<Goal?> GetAsync(int userId, int id)
    {
        return await _db.Goals
            .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
    }

    public async Task<Goal> CreateAsync(int userId, Goal goal)
    {
        goal.UserId = userId;
        _db.Goals.Add(goal);
        await _db.SaveChangesAsync();
        return goal;
    }

    public async Task<Goal> UpdateAsync(int userId, int id, Goal goal)
    {
        var existing = await GetAsync(userId, id);

        if (existing == null)
            throw new KeyNotFoundException("Goal not found.");

        existing.Name = goal.Name;
        existing.Description = goal.Description;
        existing.TargetDate = goal.TargetDate;
        existing.IsCompleted = goal.IsCompleted;

        await _db.SaveChangesAsync();
        return existing;
    }

    public async Task DeleteAsync(int userId, int id)
    {
        var existing = await GetAsync(userId, id);

        if (existing == null)
            throw new KeyNotFoundException("Goal not found.");

        _db.Remove(existing);
        await _db.SaveChangesAsync();
    }
}

