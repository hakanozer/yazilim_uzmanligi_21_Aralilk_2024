using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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

        // ------------------------------
        //  ANA ADD METHOD (RANDEVU EKLEME)
        // ------------------------------
        public object Add(AppointmentAddDto appointmentAddDto, string? userId)
        {
            if (string.IsNullOrEmpty(userId) || !long.TryParse(userId, out var userIdValue))
                return "Kullanıcı ID geçersiz.";

            // ❌ Staff kendi adına randevu alamaz
            if (appointmentAddDto.StaffId == userIdValue)
            {
                throw new BadHttpRequestException("Personel kendi adına randevu oluşturamaz.");
            }

            var appointment = _mapper.Map<Appointment>(appointmentAddDto);
            appointment.UserId = userIdValue;

            var service = _dbContext.Services.FirstOrDefault(s => s.Sid == appointmentAddDto.ServiceId);
            if (service == null)
                return "Servis bulunamadı.";

            int serviceDuration = service.DurationMinute;

            DateTime desiredStart = appointment.AppointmentDate;
            DateTime desiredEnd = desiredStart.AddMinutes(serviceDuration);

            // ------------------------------
            // PERSONEL ÇAKIŞMA KONTROLÜ
            // ------------------------------
            bool staffConflict = _dbContext.Appointments.Any(item =>
                item.StaffId == appointment.StaffId &&
                item.AppointmentDate < desiredEnd &&
                item.AppointmentDate.AddMinutes(
                    _dbContext.Services.First(s => s.Sid == item.ServiceId).DurationMinute
                ) > desiredStart
            );

            // ------------------------------
            // USER ÇAKIŞMA KONTROLÜ
            // ------------------------------
            bool userConflict = _dbContext.Appointments.Any(item =>
                item.UserId == userIdValue &&
                item.AppointmentDate < desiredEnd &&
                item.AppointmentDate.AddMinutes(
                    _dbContext.Services.First(s => s.Sid == item.ServiceId).DurationMinute
                ) > desiredStart
            );

            if (userConflict)
            {
                throw new BadHttpRequestException("Bu saat aralığında başka bir randevunuz var. Aynı anda iki randevu oluşturamazsınız.");
            }

            if (staffConflict)
            {
                var suggestions = Find5AvailableSlots(
                    appointment.StaffId,
                    desiredStart,
                    serviceDuration
                );

                return new
                {
                    Success = false,
                    Message = "Bu saat dolu. Lütfen uygun bir zaman seçin.",
                    Suggestions = suggestions
                };
            }

            // ------------------------------
            // KAYDET
            // ------------------------------
            _dbContext.Appointments.Add(appointment);
            _dbContext.SaveChanges();

            return appointment;
        }



        // ------------------------------
        // 5 UYGUN SLOT BULMA
        // ------------------------------
        private List<DateTimeOffset> Find5AvailableSlots(long staffId, DateTime startDate, int duration)
        {
            List<DateTimeOffset> results = new();
            DateTime currentDay = startDate.Date;

            while (results.Count < 5)
            {
                var appointments = _dbContext.Appointments
                    .Where(a => a.StaffId == staffId &&
                                a.AppointmentDate.Date == currentDay)
                    .OrderBy(a => a.AppointmentDate)
                    .ToList();

                DateTime workStart = currentDay.AddHours(9);
                DateTime workEnd = currentDay.AddHours(20);

                DateTime cursor = workStart;

                foreach (var a in appointments)
                {
                    var aService = _dbContext.Services.First(s => s.Sid == a.ServiceId);

                    DateTime appointmentStart = a.AppointmentDate;
                    DateTime appointmentEnd = appointmentStart.AddMinutes(aService.DurationMinute);

                    if (cursor.AddMinutes(duration) <= appointmentStart)
                    {
                        results.Add(ConvertToTurkeyOffset(cursor));
                        if (results.Count == 5) return results;
                    }

                    cursor = appointmentEnd;
                }

                if (cursor.AddMinutes(duration) <= workEnd)
                {
                    results.Add(ConvertToTurkeyOffset(cursor));
                    if (results.Count == 5) return results;
                }

                currentDay = currentDay.AddDays(1);
            }

            return results;
        }

        private DateTimeOffset ConvertToTurkeyOffset(DateTime dt)
        {
            var turkey = TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time");
            return new DateTimeOffset(dt, turkey.GetUtcOffset(dt));
        }

    }
}