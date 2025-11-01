namespace FitnessTracker.DTOs;

public record WorkoutCreateUpdateDto(string Title, DateTime Date, int DurationMin, string? Notes);

