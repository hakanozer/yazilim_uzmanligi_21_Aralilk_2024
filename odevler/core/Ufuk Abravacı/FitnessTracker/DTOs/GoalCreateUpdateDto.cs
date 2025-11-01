namespace FitnessTracker.DTOs;

public record GoalCreateUpdateDto(string Name, string? Description, DateTime? TargetDate, bool IsCompleted);

