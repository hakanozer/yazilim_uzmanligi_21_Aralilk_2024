using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.Workout
{
    [SwaggerSchema(Title = "Antrenman Güncelleme")]
    public class WorkoutUpdateDto
    {
        [Required]
        [SwaggerSchema(Description = "Antrenman ID")]
        public long wid { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Aktivite adı")]
        public string ActivityName { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Aktivite açıklaması", Nullable = true)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [SwaggerSchema(Description = "Aktivite türü (Koşu, Yüzme, vb.)")]
        public string ActivityType { get; set; } = string.Empty;

        [Required]
        [SwaggerSchema(Description = "Süre (dakika)")]
        public int Duration { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Yakılan kalori")]
        public int CaloriesBurned { get; set; }
        
        [SwaggerSchema(Description = "Antrenman tarihi", Nullable = true)]
        public DateTime WorkoutDate { get; set; }
    }
}