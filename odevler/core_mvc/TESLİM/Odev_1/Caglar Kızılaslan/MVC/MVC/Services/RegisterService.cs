using MVC.Utils;

namespace MVC.Services
{
    public class RegisterService
    {
        private readonly ApplicationDbContext _context;
        public RegisterService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void UserRegister(string name, string surname, string email, string password, string passwordAgain)
        {
            // 1) Kullanıcı zaten var mı kontrol et
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == email);
            if (existingUser != null)
            {
                throw new Exception("Bu email zaten kayıtlı.");
            }

            // 2) Yeni kullanıcı oluştur
            var newUser = new Models.User
            {
                Name = name,
                Surname = surname,
                Email = email,
                Password = BCrypt.Net.BCrypt.HashPassword(password) // Şifreyi hash'le
            };

            // 3) Veritabanına ekle
            _context.Users.Add(newUser);
            _context.SaveChanges();
        }
    }
}