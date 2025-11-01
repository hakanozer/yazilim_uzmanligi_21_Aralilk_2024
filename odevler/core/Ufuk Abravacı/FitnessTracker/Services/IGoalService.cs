namespace FitnessTracker.Services;
using FitnessTracker.Entities;

public interface IGoalService
{
    Task<List<Goal>> GetAllAsync(int userId);
    Task<Goal?> GetAsync(int userId, int id);
    Task<Goal> CreateAsync(int userId, Goal goal);
    Task<Goal> UpdateAsync(int userId, int id, Goal goal);
    Task DeleteAsync(int userId, int id);
}

