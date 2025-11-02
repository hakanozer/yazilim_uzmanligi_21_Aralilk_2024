using FitnessTracker.DTOs;

namespace FitnessTracker.Services;

public interface IWorkoutService
{
    Task<IEnumerable<WorkoutResponseDto>> GetAllWorkoutsAsync(int userId);
    Task<WorkoutResponseDto> GetWorkoutByIdAsync(int id, int userId);
    Task<WorkoutResponseDto> CreateWorkoutAsync(WorkoutCreateDto createDto, int userId);
    Task<WorkoutResponseDto> UpdateWorkoutAsync(int id, WorkoutUpdateDto updateDto, int userId);
    Task<bool> DeleteWorkoutAsync(int id, int userId);
}

