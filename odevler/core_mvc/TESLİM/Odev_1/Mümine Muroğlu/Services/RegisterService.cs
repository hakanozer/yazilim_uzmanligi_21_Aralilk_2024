using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MVC.Dto;
using MVC.Models;
using MVC.Utils;
using System.Security.Cryptography;
using System.Text;

namespace MVC.Services
{
    public class RegisterService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RegisterService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Yeni kullanıcı kaydı yapar.
        /// </summary>
        public async Task<(bool Success, string Message)> RegisterAsync(RegisterDto dto)
        {
            // Email benzersiz mi?
            var exists = await _context.Users
                .AnyAsync(a => a.Email == dto.Email);

            if (exists)
                return (false, "Bu e-posta zaten kayıtlı.");

            // DTO → Model Map (Name, Surname, Email otomatik olarak maplenir.)
            var user = _mapper.Map<User>(dto);

            // Password Hash
            user.Password = HashPassword(dto.Password);

            // Insert
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return (true, "Kayıt başarılı.");
        }

        private string HashPassword(string password)
        {
            // Güvenli şifreleme için tuz (salt) kullanmak daha iyidir, ancak 
            // sadece SHA256 ile de temel bir koruma sağlanabilir.
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}