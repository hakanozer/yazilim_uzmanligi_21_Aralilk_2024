namespace FitnessTracker.Entities;

public class Workout
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Duration { get; set; } // dakika cinsinden
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string? Notes { get; set; }
    
    public User User { get; set; } = null!;
}

