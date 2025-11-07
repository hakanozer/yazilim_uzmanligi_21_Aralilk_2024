using System;
using System.Linq;
using AutoMapper;
using RestApi.Dto.AppointmentDto;
using RestApi.Models;
using RestApi.Utils;

namespace RestApi.Services
{
    public class AppointmentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AppointmentService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public object Create(AppointmentAddDto dto, string? userId)
        {
            // kullanıcı ID kontrolü
            if (!long.TryParse(userId, out var parsedUserId))
                return "Geçerli bir kullanici ID'si bulunamadi.";

            // DTOdan entity oluşturma
            var newAppointment = _mapper.Map<Appointment>(dto);
            newAppointment.UserId = parsedUserId;

            // bilgi çekme kısmı
            var selectedService = _context.Services
                .FirstOrDefault(s => s.Sid == dto.ServiceId);

            if (selectedService == null)
                return "Servis bilgisi bulunamadi.";

            // randevü zaman hesaplama kısmı
            var serviceDuration = Convert.ToDouble(selectedService.DurationMinute);
            var startTime = newAppointment.AppointmentDate;
            var endTime = startTime.AddMinutes(serviceDuration);

            // aynı saat için randevü var mı kontrolü
            var conflictExists = _context.Appointments.Any(a =>
                a.StaffId == newAppointment.StaffId &&
                a.AppointmentDate >= startTime &&
                a.AppointmentDate <= endTime
            );

            if (conflictExists)
            {
                // çakışma olduıysa returnlayacak
                return "Seçilen tarih ve saatte uygunluk bulunmuyor.";
            }

            _context.Appointments.Add(newAppointment);
            _context.SaveChanges();

            return newAppointment;
        }
    }
}
