using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Professor;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfessorController : ControllerBase {
    private readonly IProfessorService _professorService;

    public ProfessorController(IProfessorService professorService) {
        _professorService = professorService;
    }

    [Authorize]
    [HttpPost("register")]
    public async Task<IActionResult> Create([FromBody] ProfessorRegisterDto dto) {
        // Validate model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null) {
            return Unauthorized();
        }

        ServiceResult<bool> result = await _professorService.Create(dto, int.Parse(userId));

        return result.Status switch {
            ServiceResultStatus.Success => Created(),
            ServiceResultStatus.Conflict => Conflict(result.Message),
            _ => BadRequest(result.Message)
        };
    }
}