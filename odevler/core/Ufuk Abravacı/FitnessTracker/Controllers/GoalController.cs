namespace FitnessTracker.Controllers;
using AutoMapper;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;
using FitnessTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
[Authorize] // Tüm endpointler JWT ister
public class GoalController : ControllerBase
{
    private readonly IGoalService _service;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public GoalController(IGoalService service, IAuthService authService, IMapper mapper)
    {
        _service = service;
        _authService = authService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GoalDto>>> GetAll()
    {
        var userId = _authService.GetUserId(User);
        var goals = await _service.GetAllAsync(userId);
        return Ok(goals.Select(_mapper.Map<GoalDto>));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<GoalDto>> Get(int id)
    {
        var userId = _authService.GetUserId(User);
        var goal = await _service.GetAsync(userId, id);

        if (goal == null)
            throw new KeyNotFoundException("Goal not found.");

        return Ok(_mapper.Map<GoalDto>(goal));
    }

    [HttpPost]
    public async Task<ActionResult<GoalDto>> Create(GoalCreateUpdateDto dto)
    {
        var userId = _authService.GetUserId(User);
        var goal = _mapper.Map<Goal>(dto);
        var created = await _service.CreateAsync(userId, goal);

        return CreatedAtAction(nameof(Get), new { id = created.Id }, _mapper.Map<GoalDto>(created));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<GoalDto>> Update(int id, GoalCreateUpdateDto dto)
    {
        var userId = _authService.GetUserId(User);
        var goal = _mapper.Map<Goal>(dto);
        var updated = await _service.UpdateAsync(userId, id, goal);
        return Ok(_mapper.Map<GoalDto>(updated));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = _authService.GetUserId(User);
        await _service.DeleteAsync(userId, id);
        return NoContent();
    }
}

