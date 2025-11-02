using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityLogApi.Models
{

    public class Goal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long GId { get; set; }
        
        [ForeignKey("User")]
        public long UserId { get; set; } // Foreign Key
        public User User { get; set; }  // Navigation Property

        public string GoalType { get; set; } = string.Empty;// Hedef tipi
        public string? Detail { get; set; } = string.Empty;// Hedef detayı (isteğe bağlı)

        public double TargetValue { get; set; } = 0.0;// Hedeflenen değer

        public double CurrentValue { get; set; } = 0.0;// Mevcut değer

        public DateTimeOffset StartDate { get; set; }// Başlangıç tarihi
        public DateTimeOffset EndDate { get; set; }// Bitiş tarihi
        public bool IsCompleted { get; set; } // Hedefin tamamlanma durumu
        

    }

}
