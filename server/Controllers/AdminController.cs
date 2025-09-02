using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.DTOs.Admin;
using Server.Interfaces.Admin;
using Server.Models;
using Server.Results;
using Server.Services;

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

}