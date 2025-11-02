namespace ActivityLogApi.Dto.WorkoutDto
{
    public class WorkoutDto
    {
        public int WId { get; set; }
        public string WorkoutName { get; set; }
        public int DurationMinute { get; set; }
        public DateTime Date { get; set; }
        public int CaloriesBurned { get; set; }

        // Bu DTO'nun hangi kullanıcıya ait olduğunu bilmemize gerek yok,çünkü servis katmanı zaten sadece o kullanıcıya ait olanları getirecek.
    }
}