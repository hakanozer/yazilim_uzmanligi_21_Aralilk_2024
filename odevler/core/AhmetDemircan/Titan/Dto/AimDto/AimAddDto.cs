using System.ComponentModel.DataAnnotations;

namespace Titan.Dto.GoalDto
{
    public class AimAddDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Activity { get; set; } = string.Empty;

        [StringLength(2000, MinimumLength = 5)]
        public string Detail { get; set; } = string.Empty;

        [Required]
        [Range(0, 300)]
        public int DurationMinute { get; set; } = 0;

        // Kullanıcıya bitiş tarihini seçme şansı verin.
        [Required]
        [Range(1, 365, ErrorMessage = "Süre en az 1 gün olmalıdır.")]
        public int DurationInDays { get; set; }

        // CreatedAt set automatically as today
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public bool IsCompleted { get; set; } = false;

    }
}