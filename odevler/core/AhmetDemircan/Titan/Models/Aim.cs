using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Titan.Models
{
    public class Aim
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("Name")]
        public string Goal { get; set; } = string.Empty;

        public long UserId { get; set; }
        public bool IsCompleted { get; set; } = false;
        public int DurationInDays { get; set; } = 0;
        public long ActivityGoalId { get; set; }
        public virtual Activitys ActivityGoal { get; set; } = null!;
    }
}