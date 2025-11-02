using FitnessTracker.API.Data;
using FitnessTracker.Entities;
using FitnessTracker.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            return await _context.Users
                .Select(user => new UserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email
                })
                .ToListAsync();
        }
        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }
        public async Task<UserDto> CreateAsync(UserDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            dto.Id = user.Id;
            return dto;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}