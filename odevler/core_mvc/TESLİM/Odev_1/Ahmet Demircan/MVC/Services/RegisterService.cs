using MVC.Data;
using MVC.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MVC.DTO;

namespace MVC.Services
{
    public class RegisterService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        public RegisterService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<(bool ok, string? error)> UserRegister(string name, string username, string password)
        {
            var exists = await _db.Users.AnyAsync(u => u.Email == username);
            if (exists) return (false, "Bu email zaten alınmış.");

            var dto = new RegisterDto { FullName = name, Email = username, Password = password };
            var user = _mapper.Map<User>(dto);
            Console.WriteLine($"FullName: {user.FullName}");
            Console.WriteLine($"Email: {user.Email}");
            Console.WriteLine($"Password: {user.Password}");
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return (true, null);
        }
    }
}