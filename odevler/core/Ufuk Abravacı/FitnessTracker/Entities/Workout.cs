namespace FitnessTracker.Entities;

public class Workout
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public DateTime Date { get; set; }
    public int DurationMin { get; set; }
    public string? Notes { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = default!;
}
