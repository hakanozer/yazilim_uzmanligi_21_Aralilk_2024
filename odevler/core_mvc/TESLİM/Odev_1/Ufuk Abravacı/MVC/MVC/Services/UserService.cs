using AutoMapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using MVC.Data;
using MVC.DTOs;
using MVC.Models;
using System.Security.Cryptography;

namespace MVC.Services;

public class UserService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public UserService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> RegisterUserAsync(RegisterDto dto)
    {
        var exists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
        if (exists)
            return false;

        var user = _mapper.Map<User>(dto);
        user.PasswordHash = HashPassword(dto.Password ?? string.Empty);

        _context.Users.Add(user);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }

    private string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100_000,
            numBytesRequested: 256 / 8));

        return $"{Convert.ToBase64String(salt)}.{hashed}";
    }
}