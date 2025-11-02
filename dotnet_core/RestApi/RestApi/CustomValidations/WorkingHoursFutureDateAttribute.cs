using System;
using System.ComponentModel.DataAnnotations;

namespace RestApi.CustomValidations
{
    public class WorkingHoursFutureDateAttribute : ValidationAttribute
    {
    private readonly int _startHour;
    private readonly int _endHour;

    public WorkingHoursFutureDateAttribute(int startHour = 9, int endHour = 17)
    {
        _startHour = startHour;
        _endHour = endHour;
        ErrorMessage = $"Randevu tarihi bugünden önce olamaz ve saat {_startHour}:00 ile {_endHour}:00 arasında olmalıdır.";
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value == null)
            return ValidationResult.Success;

        var date = (DateTimeOffset)value;
        var now = DateTimeOffset.Now;

        // Geçmiş tarih kontrolü
        if (date < now)
        {
            return new ValidationResult("Randevu tarihi geçmiş bir zaman olamaz.");
        }

        // Çalışma saatleri kontrolü
        var hour = date.Hour;
        if (hour < _startHour || hour >= _endHour)
        {
            return new ValidationResult($"Randevu saati {_startHour}:00 ile {_endHour}:00 arasında olmalıdır.");
        }

        return ValidationResult.Success;
        }
    }
}