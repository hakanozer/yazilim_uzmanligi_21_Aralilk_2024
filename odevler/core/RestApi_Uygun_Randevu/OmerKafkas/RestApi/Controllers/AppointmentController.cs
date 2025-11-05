using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestApi.Dto.AppointmentDto;
using RestApi.Services;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _appointmentService;
        public AppointmentController(AppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost("add")]
        [Authorize]
        public ActionResult AddAppointmentUser(AppointmentAddDto appointmentAddDto)
        {
            var UserId = User.FindFirst("id")?.Value;
            var appointment = _appointmentService.Add(appointmentAddDto, UserId);
            return Ok(appointment);
        }
    }
}