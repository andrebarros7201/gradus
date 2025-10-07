using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {
    private readonly IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService;
    }

    [Authorize]
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserCreateDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null) {
            return Unauthorized("Unauthorized");
        }

        ServiceResult<bool> result = await _userService.Create(dto, int.Parse(userId));

        return result.Status switch {
            ServiceResultStatus.Success => Created(),
            ServiceResultStatus.Conflict => Conflict(result.Message),
            _ => BadRequest(result.Message)
        };
    }
}