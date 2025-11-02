using System;
using FitnessRestApi.Models;

namespace FitnessRestApi.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        public string Type { get; set; } = null!; // "Koşu", "Bisiklet gibi.."
        public int DurationMinutes { get; set; }
        public double CaloriesBurned { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
