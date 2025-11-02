namespace FitnessTracker.DTOs
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public DateTime Date { get; set; }
    }
}

