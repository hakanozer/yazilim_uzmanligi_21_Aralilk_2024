using System.ComponentModel.DataAnnotations;

namespace Titan.Dto.UserDto.GoalDto
{
    public class AimDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Goal { get; set; } = string.Empty;
        
        public bool IsCompleted { get; set; } = false;
        
        public long ActivityGoalId { get; set; }
    }
}