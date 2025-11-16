using MVC.Utils;
using MVC.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MVC.Dto;
using BCrypt.Net;

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

        public async Task<(bool ok, string? error)> UserRegister(string name, string surname, string username, string password)
        {
            var exists = await _db.Users.AnyAsync(u => u.Email == username);
            if (exists) return (false, "Bu email zaten alınmış.");

            var dto = new RegisterDto { Name = name, Surname = surname, Email = username, Password = password };
            //DTO'yu ana User modelle
            var user = _mapper.Map<User>(dto);
            Console.WriteLine($"Name: {user.Name}");
             Console.WriteLine($"Surname: {user.Surname}");
            Console.WriteLine($"Email: {user.Email}");
            Console.WriteLine($"Password: {user.Password}");


            
          //user.Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return (true, null);
        }
    }
}
               
                
