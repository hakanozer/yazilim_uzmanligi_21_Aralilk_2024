using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.Goal
{
    [SwaggerSchema(Title = "Hedef Güncelleme")]
    public class GoalUpdateDto
    {
        [Required]
        [SwaggerSchema(Description = "Hedef ID")]
        public long Gid { get; set; }
        
        [SwaggerSchema(Description = "Hedef başlığı", Nullable = true)]
        public string Title { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef açıklaması", Nullable = true)]
        public string Description { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef türü (Kilo, Adım, vb.)", Nullable = true)]
        public string GoalType { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef değeri", Nullable = true)]
        public int TargetValue { get; set; }
        
        [SwaggerSchema(Description = "Mevcut değer", Nullable = true)]
        public int CurrentValue { get; set; }
        
        [SwaggerSchema(Description = "Ölçü birimi (kg, adım, vb.)", Nullable = true)]
        public string Unit { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Başlangıç tarihi", Nullable = true)]
        public DateTime StartDate { get; set; }
        
        [SwaggerSchema(Description = "Bitiş tarihi", Nullable = true)]
        public DateTime EndDate { get; set; }
        
        [SwaggerSchema(Description = "Tamamlandı mı?", Nullable = true)]
        public bool IsCompleted { get; set; }
    }
}