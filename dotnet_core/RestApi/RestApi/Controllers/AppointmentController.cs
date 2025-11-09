using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestApi.Dto.AppointmentDto;
using RestApi.Models;
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

        [HttpGet("list")]
        [Authorize(Roles = "Staff")]
        public ActionResult AppointmentList()
        {
            var UserId = User.FindFirst("id")?.Value;
            var list = _appointmentService.ListUpcomingByStaff(UserId);
            return Ok(list);
        }

        [HttpPatch("changeStatus")]
        [Authorize(Roles = "Staff")]
        public ActionResult ChangeStatus(AppointmentStatusChangeDto appointmentStatusChangeDto)
        {
            var UserId = User.FindFirst("id")?.Value;
            var statusObj = _appointmentService.AppointmentChangeStatus(UserId, appointmentStatusChangeDto);
            return Ok(statusObj);
        }

        [HttpGet("userList")]
        [Authorize]
        public ActionResult AppointmentUserList()
        {
            var UserId = User.FindFirst("id")?.Value;
            var appointments = _appointmentService.AppointmentUserList(UserId);
            return Ok(appointments);
        }

    }
}