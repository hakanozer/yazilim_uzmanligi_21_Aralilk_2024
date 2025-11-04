using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RestApi.Dto.AppointmentDto;
using RestApi.Utils;


namespace RestApi.Services
{
    public class ChronosRePlanner
    {
        private readonly ILogger<ChronosRePlanner> _logger;
        private readonly ApplicationDbContext _dbContext;

        public ChronosRePlanner(ILogger<ChronosRePlanner> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        /// Aynı gün + 2 gün penceresinde, en fazla 5 uygun randevu başlangıç saati üretir.
        /// İstenen servis süresine göre slotları 15 dk adımlarla tarar ve çakışma olmayanları döndürür.
        // Bellek içi çakışma kontrolünde kullanılacak net tip
        private sealed class ApptItem
        {
            public DateTime AppointmentDate { get; set; }
            public int ServiceId { get; set; }
        }

        public List<DateTime> RePlan(RestApi.Dto.AppointmentDto.AppointmentAddDto dto)
        {
            // Zaman penceresi: kullanıcının istediği gün (00:00) + 2 gün
            var windowStart = new DateTime(dto.AppointmentDate.Year, dto.AppointmentDate.Month, dto.AppointmentDate.Day, 0, 0, 0);
            var windowEnd = windowStart.AddDays(2);

            // 1) DB: Pencere içindeki randevuları tek seferde çek (AsNoTracking)
            var existingInWindow = _dbContext.Appointments
                .Where(a =>
                    a.StaffId == dto.StaffId &&
                    a.AppointmentDate >= windowStart &&
                    a.AppointmentDate < windowEnd)
                .Select(a => new ApptItem { AppointmentDate = a.AppointmentDate, ServiceId = a.ServiceId })
                .AsNoTracking()
                .ToList();

            // Slot tarama aralığı (dakika)
            const int step = 15;

            // 2) DB: Yalnızca gereken servis sürelerini çek (mevcut + istenen servis)
            var neededServiceIds = existingInWindow
                .Select(a => a.ServiceId)
                .Append(dto.ServiceId)
                .Distinct()
                .ToList();

            var serviceDurations = _dbContext.Services
                .Where(s => neededServiceIds.Contains(s.Sid))
                .AsNoTracking()
                .Select(s => new { s.Sid, s.DurationMinute })
                .ToDictionary(s => s.Sid, s => s.DurationMinute);

            // İstenen servis süresi yoksa varsayılan 30 dk kullan
            var requestedDuration = serviceDurations.TryGetValue(dto.ServiceId, out var dur) ? dur : 30;

            // CPU optimizasyonu: randevuları gün bazında gruplandır (slot kontrolünde filtreleme hızlı olur)
            var existingByDay = existingInWindow
                .GroupBy(a => a.AppointmentDate.Date)
                .ToDictionary(g => g.Key, g => g.ToList());

            // Öneri listesi
            var resultSlots = new List<DateTime>();

            // Bellekte slot taraması (09:00–17:00), en fazla 5 öneri
            for (var day = windowStart; day < windowEnd && resultSlots.Count < 5; day = day.AddDays(1))
            {
                var dayKey = day.Date;
                var dayAppointments = existingByDay.TryGetValue(dayKey, out var list) ? list : new List<ApptItem>();

                var slotStart = new DateTime(day.Year, day.Month, day.Day, 9, 0, 0);
                var workEnd = new DateTime(day.Year, day.Month, day.Day, 17, 0, 0);

                while (slotStart.AddMinutes(requestedDuration) <= workEnd && resultSlots.Count < 5)
                {
                    var slotEnd = slotStart.AddMinutes(requestedDuration);

                    // Bellekte çakışma kontrolü: slotStart < apptEnd && slotEnd > apptStart
                    var conflict = dayAppointments.Any(appt =>
                    {
                        var apptDuration = serviceDurations.TryGetValue(appt.ServiceId, out var d) ? d : requestedDuration;
                        var apptEnd = appt.AppointmentDate.AddMinutes(apptDuration);
                        return slotStart < apptEnd && slotEnd > appt.AppointmentDate;
                    });

                    if (!conflict)
                    {
                        resultSlots.Add(slotStart);
                    }

                    slotStart = slotStart.AddMinutes(step);
                }
            }

            _logger.LogInformation(
                "RePlan suggestions for StaffId {StaffId}, ServiceId {ServiceId}: {Suggestions}",
                dto.StaffId,
                dto.ServiceId,
                string.Join(", ", resultSlots.Select(x => x.ToString("yyyy-MM-dd HH:mm")))
            );

            return resultSlots;
        }
    }
}
