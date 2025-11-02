
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WorkoutGoalApi.Models
{
   
    public class Goal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long GId { get; set; }
        public string GoalType { get; set; } = string.Empty;
        public string Detail { get; set; } = string.Empty;
        public double TargetValue { get; set; } = 0.0;
        public double CurrentValue { get; set; } = 0.0;
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public bool IsCompleted { get; set; } 
        

        [ForeignKey("User")]
        public long UserId { get; set; } 
        public User User { get; set; }  
    }
}