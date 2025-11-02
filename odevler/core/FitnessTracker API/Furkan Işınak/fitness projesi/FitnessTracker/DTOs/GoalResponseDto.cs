namespace FitnessTracker.DTOs;

public class GoalResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime TargetDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsCompleted { get; set; }
}

