namespace FitnessTracker.DTOs;

public record WorkoutDto(int Id, string Title, DateTime Date, int DurationMin, string? Notes);
