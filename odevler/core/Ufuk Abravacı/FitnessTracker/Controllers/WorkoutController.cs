namespace FitnessTracker.Controllers;
using AutoMapper;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;
using FitnessTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorkoutController : ControllerBase
{
    private readonly IWorkoutService _svc;
    private readonly IAuthService _auth;
    private readonly IMapper _m;
    public WorkoutController(IWorkoutService s, IAuthService a, IMapper m)
    {
        _svc = s;
        _auth = a;
        _m = m;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkoutDto>>> GetAll()
    {
        var uid = _auth.GetUserId(User);
        var list = await _svc.GetAllAsync(uid);
        return Ok(list.Select(_m.Map<WorkoutDto>));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WorkoutDto>> Get(int id)
    {
        var uid = _auth.GetUserId(User);
        var e = await _svc.GetAsync(uid, id) ?? throw new KeyNotFoundException("Workout not found");
        return Ok(_m.Map<WorkoutDto>(e));
    }

    [HttpPost]
    public async Task<ActionResult<WorkoutDto>> Create(WorkoutCreateUpdateDto dto)
    {
        var uid = _auth.GetUserId(User);
        var created = await _svc.CreateAsync(uid, _m.Map<Workout>(dto));
        return CreatedAtAction(nameof(Get), new { id = created.Id }, _m.Map<WorkoutDto>(created));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<WorkoutDto>> Update(int id, WorkoutCreateUpdateDto dto)
    {
        var uid = _auth.GetUserId(User);
        var updated = await _svc.UpdateAsync(uid, id, _m.Map<Workout>(dto));
        return Ok(_m.Map<WorkoutDto>(updated));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var uid = _auth.GetUserId(User);
        await _svc.DeleteAsync(uid, id);
        return NoContent();
    }
}
