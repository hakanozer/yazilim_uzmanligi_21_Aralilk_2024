namespace FitnessTracker.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
}

