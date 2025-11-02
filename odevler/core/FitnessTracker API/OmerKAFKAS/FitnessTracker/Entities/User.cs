using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
        public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    }
}

