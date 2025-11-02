using FitnessTracker.DTOs;

namespace FitnessTracker.Services;

public interface IGoalService
{
    Task<IEnumerable<GoalResponseDto>> GetAllGoalsAsync(int userId);
    Task<GoalResponseDto> GetGoalByIdAsync(int id, int userId);
    Task<GoalResponseDto> CreateGoalAsync(GoalCreateDto createDto, int userId);
    Task<GoalResponseDto> UpdateGoalAsync(int id, GoalUpdateDto updateDto, int userId);
    Task<bool> DeleteGoalAsync(int id, int userId);
}

