using System;

namespace FitnessRestApi.Dto
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = null!;
        public int DurationMinutes { get; set; }
        public double CaloriesBurned { get; set; }
        public DateTime? Date { get; set; }
    }
}