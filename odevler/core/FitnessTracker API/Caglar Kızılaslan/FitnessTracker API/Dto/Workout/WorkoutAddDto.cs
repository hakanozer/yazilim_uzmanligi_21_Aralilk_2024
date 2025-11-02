using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.Workout
{
    [SwaggerSchema(Title = "Antrenman Ekleme")]
    public class WorkoutAddDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        [SwaggerSchema(Description = "Aktivite adı")]
        public string ActivityName { get; set; } = string.Empty;
        
        [Required]
        [SwaggerSchema(Description = "Aktivite türü (Koşu, Yüzme, vb.)")]
        public string ActivityType { get; set; } = string.Empty;

        [Required]
        [SwaggerSchema(Description = "Süre (dakika)")]
        public int Duration { get; set; }
        
    }
}