
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WorkoutGoalApi.Models
{
    public class Workout
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long WId { get; set; }
        public string  WorkoutType{ get; set; } = string.Empty;
        public string Detail { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int CaloriesBurned { get; set; }

        [ForeignKey("User")]
        public long UserId { get; set; } 
        public User User { get; set; } 
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}