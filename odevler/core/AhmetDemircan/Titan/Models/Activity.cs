using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Titan.Models
{
    public class Activitys
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Activity { get; set; } = string.Empty;
        public string Detail { get; set; } = string.Empty;
        public long UserId { get; set; } // Kullanıcı kimliği eklendi
        public virtual ICollection<Aim> Aims { get; set; } = new List<Aim>();
        public string DurationMinute { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ValidUntil { get; set; } = DateTime.Now;
    }
}