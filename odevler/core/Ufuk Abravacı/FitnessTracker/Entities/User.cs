namespace FitnessTracker.Entities;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
}
