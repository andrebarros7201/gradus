using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Admin;
using Server.Interfaces.Admin;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase {
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService) {
        _adminService = adminService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AdminRegisterDto registerDto) {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        ServiceResult<bool> result = await _adminService.Register(registerDto);

        return result.Status switch {
            ServiceResultStatus.Success => Created(),
            ServiceResultStatus.Conflict => Conflict(result.Message),
            _ => BadRequest(result.Message)
        };
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AdminLoginDto loginDto) {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        ServiceResult<AdminDto> result = await _adminService.Login(loginDto);

        return result.Status switch {
            ServiceResultStatus.Success => Ok(result.Data),
            ServiceResultStatus.Unauthorized => Unauthorized(result.Message),
            _ => BadRequest(result.Message)
        };
    }


}