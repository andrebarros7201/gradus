using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.User;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {
    private readonly IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserCreateDto dto) {
        
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // When creating a user that is not an admin, the user id must be provided
        if (dto.Role != Role.Admin) {
            if (userId == null) {
                return Unauthorized("Unauthorized");
            }
        }

        ServiceResult<bool> result = await _userService.Create(dto, dto.Role != Role.Admin ? int.Parse(userId) : null);

        return result.Status switch {
            ServiceResultStatus.Success => Created(),
            ServiceResultStatus.Unauthorized => Unauthorized(result.Message),
            ServiceResultStatus.Conflict => Conflict(result.Message),
            _ => BadRequest(result.Message)
        };
    }
}