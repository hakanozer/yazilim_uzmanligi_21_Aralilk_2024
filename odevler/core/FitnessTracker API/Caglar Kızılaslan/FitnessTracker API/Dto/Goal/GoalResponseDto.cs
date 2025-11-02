using System;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.Goal
{
    [SwaggerSchema(Title = "Hedef Yanıtı")]
    public class GoalResponseDto
    {
        [SwaggerSchema(Description = "Hedef ID")]
        public long Gid { get; set; }
        
        [SwaggerSchema(Description = "Kullanıcı ID")]
        public long UserId { get; set; }
        
        [SwaggerSchema(Description = "Hedef başlığı")]
        public string Title { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef açıklaması")]
        public string Description { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef türü")]
        public string GoalType { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef değeri")]
        public int TargetValue { get; set; }
        
        [SwaggerSchema(Description = "Mevcut değer")]
        public int CurrentValue { get; set; }
        
        [SwaggerSchema(Description = "Ölçü birimi")]
        public string Unit { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Başlangıç tarihi")]
        public DateTime StartDate { get; set; }
        
        [SwaggerSchema(Description = "Bitiş tarihi")]
        public DateTime EndDate { get; set; }
        
        [SwaggerSchema(Description = "Tamamlandı mı?")]
        public bool IsCompleted { get; set; }
        
        [SwaggerSchema(Description = "Oluşturulma tarihi")]
        public DateTime CreatedAt { get; set; }
        
        [SwaggerSchema(Description = "Güncellenme tarihi")]
        public DateTime? UpdatedAt { get; set; }
    }
}