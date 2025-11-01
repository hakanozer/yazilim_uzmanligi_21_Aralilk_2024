namespace FitnessTracker.DTOs;

public record GoalDto(int Id, string Name, string? Description, DateTime? TargetDate, bool IsCompleted);

