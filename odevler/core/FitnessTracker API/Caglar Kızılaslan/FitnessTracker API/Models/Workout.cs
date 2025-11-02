using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessTracker_API.Models
{
    public class Workout
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Wid { get; set; }

        public long UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public string ActivityName { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public string ActivityType { get; set; } = string.Empty; // Koşu, yüzme, bisiklet, ağırlık kaldırma vb.

        public int Duration { get; set; } // Dakika cinsinden

        public int CaloriesBurned { get; set; }
        
        public DateTime WorkoutDate { get; set; } = DateTime.Now;
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public DateTime? UpdatedAt { get; set; }
    }
}