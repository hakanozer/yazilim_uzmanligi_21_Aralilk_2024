using System.ComponentModel.DataAnnotations;

namespace ActivityLogApi.Dto.GoalDto
{
    // Güncelleme için genellikle tüm alanlar gerekmez.
    // Özellikle hedefin mevcut durumunu güncellemek için ayrı bir DTO da yapılabilir
    
    public class GoalUpdateDto
    {
        [Required]
        [StringLength(150, MinimumLength = 3)]
        public string GoalType { get; set; }

        [Required]
        [StringLength(300, MinimumLength = 5)]
        public string? Detail { get; set; } 

        [Required]
        [Range(0.1, double.MaxValue)]
        public double TargetValue { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double CurrentValue { get; set; }

        [Required]
        public DateTimeOffset StartDate { get; set; }

        [Required]
        public DateTimeOffset EndDate { get; set; }
    }
}