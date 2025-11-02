
using System.ComponentModel.DataAnnotations;
using RestApi.CustomValidations;

namespace RestApi.Dto.AppointmentDto
{

    public class AppointmentAddDto
    {

        [Required]
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int ServiceId { get; set; }

        [Required]
        [Range(minimum: 1, maximum: long.MaxValue)]
        public long StaffId { get; set; }

        [Required]
        [WorkingHoursFutureDate]
        public DateTimeOffset AppointmentDate { get; set; }

    }
}