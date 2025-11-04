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
        public List<DateTime> RePlan(RestApi.Dto.AppointmentDto.AppointmentAddDto dto)
        {
            // Servis süreleri sözlüğü (anahtar: Service.Sid) — randevu sürelerini hesaplamak için gerekli
            var serviceDurations = _dbContext.Services
                .AsNoTracking()
                .Select(s => new { s.Sid, s.DurationMinute })
                .ToDictionary(s => s.Sid, s => s.DurationMinute);
        
            // İstenen servis süresi (dakika) — bilinmiyorsa varsayılan 30 dk kullanılır
            var requestedDuration = serviceDurations.TryGetValue(dto.ServiceId, out var dur) ? dur : 30;
        
            // Arama penceresi: kullanıcının istediği günün 00:00'ından başlayıp +2 gün
            var windowStart = new DateTime(dto.AppointmentDate.Year, dto.AppointmentDate.Month, dto.AppointmentDate.Day, 0, 0, 0);
            var windowEnd = windowStart.AddDays(2);
        
            // Mevcut randevuları belleğe al: ilgili personelin, aralık içinde olan tüm randevuları
            var existing = _dbContext.Appointments
                .Where(a =>
                    a.StaffId == dto.StaffId &&
                    a.AppointmentDate >= windowStart &&
                    a.AppointmentDate < windowEnd)
                .Select(a => new { a.AppointmentDate, a.ServiceId })
                .AsNoTracking()
                .ToList();
        
            // Öneri biriktirici ve tarama adımı (dakika cinsinden)
            var resultSlots = new List<DateTime>();
            const int step = 15; // dk — slot tarama aralığı
        
            // Aralık içindeki her günü, en fazla 5 öneri bulunana kadar dolaş
            for (var day = windowStart; day < windowEnd && resultSlots.Count < 5; day = day.AddDays(1))
            {
                // Çalışma saatleri: 09:00–18:00
                var slotStart = new DateTime(day.Year, day.Month, day.Day, 9, 0, 0);
                var workEnd = new DateTime(day.Year, day.Month, day.Day, 18, 0, 0);
        
                // 'requestedDuration' süresinde kayan bir pencere ile uygun slotları tara
                while (slotStart.AddMinutes(requestedDuration) <= workEnd && resultSlots.Count < 5)
                {
                    var slotEnd = slotStart.AddMinutes(requestedDuration);
        
                    // Çakışma kontrolü: slotStart < mevcutBitiş VE slotEnd > mevcutBaşlangıç ise çakışır
                    var conflict = existing.Any(appt =>
                    {
                        var apptDuration = serviceDurations.TryGetValue(appt.ServiceId, out var d) ? d : requestedDuration;
                        var apptEnd = appt.AppointmentDate.AddMinutes(apptDuration);
                        return slotStart < apptEnd && slotEnd > appt.AppointmentDate;
                    });
        
                    // Çakışma yoksa öneriye ekle
                    if (!conflict)
                    {
                        resultSlots.Add(slotStart);
                    }
        
                    // Bir sonraki aday slota ilerle
                    slotStart = slotStart.AddMinutes(step);
                }
            }
        
            // Gözlemlenebilirlik için: üretilen önerileri logla
            // _logger.LogInformation(
            //     "RePlan suggestions for StaffId {StaffId}, ServiceId {ServiceId}: {Suggestions}",
            //     dto.StaffId,
            //     dto.ServiceId,
            //     string.Join(", ", resultSlots.Select(x => x.ToString("yyyy-MM-dd HH:mm")))
            // );
        
            // En fazla 5 uygun başlangıç zamanını döndür
            return resultSlots;
        }
    }
}
