using System;

namespace FitnessRestApi.Dto
{
    public class GoalDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public double TargetValue { get; set; }
        public double CurrentValue { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}