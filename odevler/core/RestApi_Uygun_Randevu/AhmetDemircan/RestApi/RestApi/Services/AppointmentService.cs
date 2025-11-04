using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http.Features;
using RestApi.Dto.AppointmentDto;
using RestApi.Models;
using RestApi.Utils;

namespace RestApi.Services
{
    public class AppointmentService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ChronosRePlanner _rePlanner;

        public AppointmentService(ApplicationDbContext dbContext, IMapper mapper, ChronosRePlanner rePlanner)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _rePlanner = rePlanner;
        }

        public object Add(AppointmentAddDto appointmentAddDto, string? userId)
        {
            if (string.IsNullOrEmpty(userId) || !long.TryParse(userId, out var userIdValue))
                return "Kullanıcı ID geçersiz.";

            // Kullanıcı var mı kontrol
            if (!_dbContext.Users.Any(u => u.Id == userIdValue))
                return "Kullanıcı bulunamadı.";

            // Personel (Staff) var mı kontrol
            if (!_dbContext.Users.Any(u => u.Id == appointmentAddDto.StaffId))
                return "Personel (staffId) bulunamadı.";

            var appointment = _mapper.Map<Appointment>(appointmentAddDto);
            appointment.UserId = userIdValue;

            var serviceTime = _dbContext.Services
                .FirstOrDefault(item => item.Sid == appointmentAddDto.ServiceId)
                ?.DurationMinute;

            if (serviceTime == null)
                return "Servis süresi bulunamadı.";

            var appointDate = appointment.AppointmentDate;
            var addServiceTimeAppointDate = appointDate.AddMinutes(Convert.ToDouble(serviceTime));

            var timeControl = _dbContext.Appointments.FirstOrDefault(
                item =>
                    item.StaffId == appointment.StaffId &&
                    item.AppointmentDate >= appointDate &&
                    item.AppointmentDate <= addServiceTimeAppointDate
            );

            if (timeControl != null)
            {
                var emptySlots = _rePlanner.RePlan(appointmentAddDto);
                return new
                {
                    success = false,
                    message = "Şu an müsaitlik yok",
                    staffId = appointmentAddDto.StaffId,
                    serviceId = appointmentAddDto.ServiceId,
                    appointmentDateRequested = appointmentAddDto.AppointmentDate,
                    suggestions = emptySlots // List<DateTime> olarak döner
                };
            }

            _dbContext.Appointments.Add(appointment);
            _dbContext.SaveChanges();
            return appointment;
        }

    }
}