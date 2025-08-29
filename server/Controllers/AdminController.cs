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
    private readonly TokenService _tokenService;

    public AdminController(IAdminService adminService, TokenService tokenService) {
        _adminService = adminService;
        _tokenService = tokenService;
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

        // Generate token
        string token = _tokenService.GenerateToken(new UserAuthDto { Id = result.Data.Id, Username = result.Data.Username, Role = Role.Admin });

        // Set cookie
        Response.Cookies.Append("token", token,
            new CookieOptions {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.Now.AddDays(1),
                SameSite = SameSiteMode.None
            }
        );

        return result.Status switch {
            ServiceResultStatus.Success => Ok(result.Data),
            ServiceResultStatus.Unauthorized => Unauthorized(result.Message),
            _ => BadRequest(result.Message)
        };
    }


}