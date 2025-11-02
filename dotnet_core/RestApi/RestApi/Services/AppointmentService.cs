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

        public object Add(AppointmentAddDto appointmentAddDto, string? UserId)
        {
            var appointment = _mapper.Map<Appointment>(appointmentAddDto);
            appointment.UserId = Convert.ToInt64(UserId);
            var serviceTime = _dbContext.Services.FirstOrDefault(item => item.Sid == appointmentAddDto.ServiceId)?.DurationMinute;
            var appointDate = appointment.AppointmentDate;
            var addServiceTimeAppointDate = appointDate.AddMinutes(Convert.ToDouble(serviceTime));

            // Time Appoint Controller
            var timeControl = _dbContext.Appointments.FirstOrDefault(
                item =>
                item.StaffId == appointment.StaffId &&
                item.AppointmentDate >= appointDate &&
                item.AppointmentDate <= addServiceTimeAppointDate
            );

            if (timeControl == null)
            {
                // kullanıcıya tahine en yakın 5 adet boşta bulunan önerilerde bulun
                return "Şu an müsaitlik yok";
            }else
            {
                _dbContext.Appointments.Add(appointment);
                _dbContext.SaveChanges();
                return appointment;
            }
        }

    }
}