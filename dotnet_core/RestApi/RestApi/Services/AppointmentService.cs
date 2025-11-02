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
        public AppointmentService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public object Add(AppointmentAddDto appointmentAddDto, string? userId)
        {
            if (string.IsNullOrEmpty(userId) || !long.TryParse(userId, out var userIdValue))
                return "Kullanıcı ID geçersiz.";

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
                // önümüzdeki yada varsa bir önceki 1 veya 2 Gün içinde uygun olan 5 adet öneride bulun
                return "Şu an müsaitlik yok";
            }
                

            _dbContext.Appointments.Add(appointment);
            _dbContext.SaveChanges();
            return appointment;
        }


    }
}