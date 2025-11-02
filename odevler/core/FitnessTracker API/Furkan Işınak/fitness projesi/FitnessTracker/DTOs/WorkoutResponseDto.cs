namespace FitnessTracker.DTOs;

public class WorkoutResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Duration { get; set; }
    public DateTime Date { get; set; }
    public string? Notes { get; set; }
}

