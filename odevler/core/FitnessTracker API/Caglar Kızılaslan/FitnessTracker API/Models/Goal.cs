using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessTracker_API.Models
{
    public class Goal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Gid { get; set; }

        public long UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public string GoalType { get; set; } = string.Empty; // Kilo verme, kas kazanma, dayanıklılık artırma
        
        public int TargetValue { get; set; } // Hedef değer (örn: 10 kg kilo kaybı, 5 km koşu)
        
        public int CurrentValue { get; set; } // Şu anki değer
        
        public string Unit { get; set; } = string.Empty; // Birim (kg, km, dakika, vb.)
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public bool IsCompleted { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public DateTime? UpdatedAt { get; set; }
    }
}