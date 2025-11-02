namespace FitnessTracker.Controllers;

using FitnessTracker.DTOs;
using FitnessTracker.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;
    public AuthController(IAuthService auth) { _auth = auth; }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req) =>
      Ok(await _auth.RegisterAsync(req));

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest req) =>
      Ok(await _auth.LoginAsync(req));
}
