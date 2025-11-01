namespace FitnessTracker.DTOs;

public record AuthResponse(string Token, DateTime ExpiresAt, string UserName);
