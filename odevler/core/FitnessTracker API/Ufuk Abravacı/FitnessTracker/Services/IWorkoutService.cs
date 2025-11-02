using FitnessTracker.Entities;

namespace FitnessTracker.Services;

public interface IWorkoutService
{
    Task<List<Workout>> GetAllAsync(int userId);
    Task<Workout?> GetAsync(int userId, int id);
    Task<Workout> CreateAsync(int userId, Workout w);
    Task<Workout> UpdateAsync(int userId, int id, Workout w);
    Task DeleteAsync(int userId, int id);
}
