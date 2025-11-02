using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.Goal
{
    [SwaggerSchema(Title = "Hedef Ekleme")]
    public class GoalAddDto
    {
        [Required]
        [SwaggerSchema(Description = "Hedef başlığı")]
        public string Title { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Hedef açıklaması", ReadOnly = false, Nullable = true)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [SwaggerSchema(Description = "Hedef türü (Kilo, Adım, vb.)")]
        public string GoalType { get; set; } = string.Empty;
        
        [Required]
        [SwaggerSchema(Description = "Hedef değeri")]
        public int TargetValue { get; set; }
        
        [SwaggerSchema(Description = "Mevcut değer", ReadOnly = true)]
        public int CurrentValue { get; set; } = 0;
        
        [Required]
        [SwaggerSchema(Description = "Ölçü birimi (kg, adım, vb.)")]
        public string Unit { get; set; } = string.Empty;
        
        [Required]
        [SwaggerSchema(Description = "Başlangıç tarihi")]
        public DateTime StartDate { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Bitiş tarihi")]
        public DateTime EndDate { get; set; }
    }
}