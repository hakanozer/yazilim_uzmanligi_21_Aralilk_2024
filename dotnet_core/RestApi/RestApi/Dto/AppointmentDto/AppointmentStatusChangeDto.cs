using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using RestApi.Models;

namespace RestApi.Dto.AppointmentDto
{

    public class AppointmentStatusChangeDto
    {
        [Required]
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int AppointmentId { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AppointmentStatus Status { get; set; }

    }
}