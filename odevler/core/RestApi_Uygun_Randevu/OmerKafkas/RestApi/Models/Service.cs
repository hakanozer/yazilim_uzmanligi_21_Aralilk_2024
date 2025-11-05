using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Service
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sid { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Detail { get; set; } = string.Empty;

        public int DurationMinute { get; set; }

        public decimal Price { get; set; }
    }
}