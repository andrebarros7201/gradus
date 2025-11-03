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

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id) {
        ServiceResult<UserDto> result = await _userService.FetchUser(id);
        return ServiceResult<UserDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMe() {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        ServiceResult<UserDto> result = await _userService.FetchUser(int.Parse(currentUserId!));
        return ServiceResult<UserDto>.ReturnStatus(result);
    }


    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<string> result = await _userService.Create(dto, int.Parse(userId!));

        return ServiceResult<string>.ReturnStatus(result);
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Can use ! because of the [Authorize] attribute
        ServiceResult<string> result = await _userService.Delete(id, int.Parse(currentUserId!));

        return ServiceResult<string>.ReturnStatus(result);
    }

    [Authorize]
    [HttpPatch("{targetUserId:int}")]
    public async Task<IActionResult> Update([FromRoute] int targetUserId, [FromBody] UserUpdateDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);


        // Can use ! because of the [Authorize] attribute
        ServiceResult<UserDto> result = await _userService.Update(targetUserId, int.Parse(currentUserId!), dto);

        return ServiceResult<UserDto>.ReturnStatus(result);
    }
}