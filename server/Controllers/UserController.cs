using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
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
    public async Task<IActionResult> Register([FromBody] UserRegisterDto dto) {
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

        return ServiceResult<bool>.ReturnStatus(result);
    }
    
    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Can use ! because of [Authorize] attribute
        ServiceResult<bool> result = await _userService.Delete(id, int.Parse(currentUserId!));

        return ServiceResult<bool>.ReturnStatus(result);
    }

    [Authorize]
    [HttpPatch("{targetUserId:int}")]
    public async Task<IActionResult> Update([FromRoute] int targetUserId, [FromBody] UserPatchDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);


        // Can use ! because of [Authorize] attribute
        ServiceResult<UserDto> result = await _userService.Update(targetUserId, int.Parse(currentUserId!), dto);

        return ServiceResult<UserDto>.ReturnStatus(result);
    }
}