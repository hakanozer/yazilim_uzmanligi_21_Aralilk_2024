namespace FitnessTracker.Entities;

public class Goal
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? TargetDate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = default!;
}
