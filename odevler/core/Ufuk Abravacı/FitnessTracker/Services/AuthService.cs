namespace FitnessTracker.Services;
using FitnessTracker.Data;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService : IAuthService
{
    private readonly FitnessContext _db;
    private readonly IConfiguration _cfg;
    public AuthService(FitnessContext db, IConfiguration cfg) { _db = db; _cfg = cfg; }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest req)
    {
        if (await _db.Users.AnyAsync(x => x.UserName == req.UserName || x.Email == req.Email))
            throw new InvalidOperationException("User already exists");
        var user = new User
        {
            UserName = req.UserName,
            Email = req.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password)
        };
        _db.Add(user); await _db.SaveChangesAsync();
        return await LoginAsync(new LoginRequest(req.UserName, req.Password));
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest req)
    {
        var u = await _db.Users.SingleOrDefaultAsync(x => x.UserName == req.UserName);
        if (u is null || !BCrypt.Net.BCrypt.Verify(req.Password, u.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddMinutes(int.Parse(_cfg["Jwt:ExpiresMinutes"] ?? "60"));
        var claims = new[] {
      new Claim(JwtRegisteredClaimNames.Sub, u.Id.ToString()),
      new Claim(ClaimTypes.Name, u.UserName)
    };
        var token = new JwtSecurityToken(_cfg["Jwt:Issuer"], _cfg["Jwt:Audience"], claims,
                                         expires: expires, signingCredentials: creds);
        return new AuthResponse(new JwtSecurityTokenHandler().WriteToken(token), expires, u.UserName);
    }

    public int GetUserId(ClaimsPrincipal user)
    {
        var sub = user.FindFirstValue(JwtRegisteredClaimNames.Sub)
              ?? user.FindFirstValue(ClaimTypes.NameIdentifier)
              ?? throw new UnauthorizedAccessException("UserId not found in token");
        return int.Parse(sub);
    }
}
