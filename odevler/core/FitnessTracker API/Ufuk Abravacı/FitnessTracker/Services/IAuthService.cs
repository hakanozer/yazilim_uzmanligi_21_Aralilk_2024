namespace FitnessTracker.Services;
using FitnessTracker.DTOs;
using System.Security.Claims;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest req);
    Task<AuthResponse> LoginAsync(LoginRequest req);
    int GetUserId(ClaimsPrincipal user);
}
