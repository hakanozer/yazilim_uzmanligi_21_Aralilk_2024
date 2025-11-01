using FitnessTracker.Data;
using FitnessTracker.Entities;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Services;

public class WorkoutService : IWorkoutService
{
    private readonly FitnessContext _db;
    public WorkoutService(FitnessContext db) { _db = db; }

    public Task<List<Workout>> GetAllAsync(int userId) =>
      _db.Workouts.Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToListAsync();

    public Task<Workout?> GetAsync(int userId, int id) =>
      _db.Workouts.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

    public async Task<Workout> CreateAsync(int userId, Workout w)
    {
        w.UserId = userId; _db.Add(w); await _db.SaveChangesAsync(); return w;
    }
    public async Task<Workout> UpdateAsync(int userId, int id, Workout w)
    {
        var e = await GetAsync(userId, id) ?? throw new KeyNotFoundException();
        e.Title = w.Title; e.Date = w.Date; e.DurationMin = w.DurationMin; e.Notes = w.Notes;
        await _db.SaveChangesAsync(); return e;
    }
    public async Task DeleteAsync(int userId, int id)
    {
        var e = await GetAsync(userId, id) ?? throw new KeyNotFoundException();
        _db.Remove(e); await _db.SaveChangesAsync();
    }
}
