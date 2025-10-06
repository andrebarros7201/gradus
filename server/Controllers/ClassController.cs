using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Class;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClassController : ControllerBase {
    private readonly IClassService _classService;

    public ClassController(IClassService classService) {
        _classService = classService;
    }

    [Authorize]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] ClassRegisterDto dto) {
        // Validate model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null) {
            return Unauthorized();
        }

        ServiceResult<bool> result = await _classService.Create(dto, int.Parse(userId));

        return result.Status switch {
            ServiceResultStatus.Success => Created(),
            ServiceResultStatus.Unauthorized => Unauthorized(result.Message),
            ServiceResultStatus.Conflict => Conflict(result.Message),
            _ => BadRequest(result.Message)
        };
    }
}