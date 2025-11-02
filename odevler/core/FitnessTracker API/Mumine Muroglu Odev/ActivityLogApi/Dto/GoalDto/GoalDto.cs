namespace ActivityLogApi.Dto.GoalDto
{
    public class GoalDto
    {
        public int GId { get; set; }
        public string GoalType { get; set; }
        public string? Detail { get; set; } 
        public double TargetValue { get; set; }
        public double CurrentValue { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public bool IsCompleted { get; set; } 
    }
}