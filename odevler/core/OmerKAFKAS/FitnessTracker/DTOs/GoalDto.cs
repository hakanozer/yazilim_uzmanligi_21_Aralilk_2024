namespace FitnessTracker.DTOs
{
    public class GoalDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime TargetDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}

