using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RestApi.Models
{
    public enum AppointmentStatus
    {
        Pending,
        Approved,
        Completed,
        Cancelled
    }

    public class Appointment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Aid { get; set; }

        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }  // Navigation property

        [ForeignKey("Staff")]
        public long StaffId { get; set; }
        public User Staff { get; set; } // Navigation property

        [Required]
        public DateTimeOffset AppointmentDate { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    }
}