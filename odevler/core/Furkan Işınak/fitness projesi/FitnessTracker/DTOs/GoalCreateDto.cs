using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.DTOs;

public class GoalCreateDto
{
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public DateTime TargetDate { get; set; }
}

