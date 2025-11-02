using System;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.Workout
{
    [SwaggerSchema(Title = "Antrenman Yanıtı")]
    public class WorkoutResponseDto
    {
        [SwaggerSchema(Description = "Antrenman ID")]
        public long Wid { get; set; }
        
        [SwaggerSchema(Description = "Kullanıcı ID")]
        public long UserId { get; set; }
        
        [SwaggerSchema(Description = "Aktivite adı")]
        public string ActivityName { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Aktivite açıklaması")]
        public string Description { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Aktivite türü")]
        public string ActivityType { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Süre (dakika)")]
        public int Duration { get; set; }
        
        [SwaggerSchema(Description = "Yakılan kalori")]
        public int CaloriesBurned { get; set; }
        
        [SwaggerSchema(Description = "Antrenman tarihi")]
        public DateTime WorkoutDate { get; set; }
        
        [SwaggerSchema(Description = "Oluşturulma tarihi")]
        public DateTime CreatedAt { get; set; }
        
        [SwaggerSchema(Description = "Güncellenme tarihi")]
        public DateTime? UpdatedAt { get; set; }
    }
}