using System.ComponentModel.DataAnnotations;

namespace RestApi.Dto.ServiceDto
{
    public class ServiceAddDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [StringLength(2000, MinimumLength = 5)]
        public string Detail { get; set; } = string.Empty;

        [Required]
        [Range(15, 300)]
        public int DurationMinute { get; set; }

        [Required]
        [Range(minimum:1.0, maximum: 10000)]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }
    }
}