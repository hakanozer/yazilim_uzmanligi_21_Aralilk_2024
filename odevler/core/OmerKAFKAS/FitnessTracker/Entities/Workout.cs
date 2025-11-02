using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.Entities
{
    public class Workout
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public int DurationMinutes { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int UserId { get; set; }
        
        public User? User { get; set; }
    }
}