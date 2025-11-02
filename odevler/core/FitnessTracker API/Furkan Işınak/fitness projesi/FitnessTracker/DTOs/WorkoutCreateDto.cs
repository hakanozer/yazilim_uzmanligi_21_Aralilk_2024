using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.DTOs;

public class WorkoutCreateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Type { get; set; } = string.Empty;
    
    [Required]
    [Range(1, 1000)]
    public int Duration { get; set; }
    
    public DateTime Date { get; set; } = DateTime.UtcNow;
    
    public string? Notes { get; set; }
}

