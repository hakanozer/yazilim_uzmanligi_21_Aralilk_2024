using System.ComponentModel.DataAnnotations;

namespace ActivityLogApi.Dto.WorkoutDto
{
    public class WorkoutCreateDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string WorkoutName { get; set; }

        [Required]
        [StringLength(300, MinimumLength = 5)]
        public string? Description { get; set; }

        [Required]
        [Range(1, 720)]
        public int DurationMinute { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Range(0, 10000)]
        public int CaloriesBurned { get; set; }

        // UserId buradan alınmaz, serviste jwt'den alınır.
    }
}