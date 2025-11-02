using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.Entities
{
    public class Goal
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }

        public int UserId { get; set; }

        [Required]
        public User User { get; set; } = null!;
    }
}