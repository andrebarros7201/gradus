using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Interfaces.Admin;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly IAuthService _authService;
    private readonly TokenService _tokenService;

    public AuthController(IAuthService authServiceService, TokenService tokenService) {
        _authService = authServiceService;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto dto) {
        // Validate model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        ServiceResult<UserDto> result = await _authService.Login(dto);

        if (result.Status != ServiceResultStatus.Success) {
            return result.Status switch {
                ServiceResultStatus.Unauthorized => Unauthorized(result.Message),
                ServiceResultStatus.NotFound => NotFound(result.Message),
                _ => BadRequest(result.Message)
            };
        }

        string token = _tokenService.GenerateToken(new TokenDataDto {
            Id = result.Data.Id,
            Username = result.Data.Username,
            Name = result.Data.Admin.Name,
            Role = result.Data.Role
        });

        Response.Cookies.Append("token", token, new CookieOptions {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return Ok(result.Data);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> FetchUser() {
        string? userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) {
            return Unauthorized();
        }

        ServiceResult<UserDto> result = await _authService.FetchUser(int.Parse(userId));
        return result.Status switch {
            ServiceResultStatus.Success => Ok(result.Data),
            ServiceResultStatus.NotFound => NotFound(result.Message),
            _ => BadRequest(result.Message)
        };
    }

    [Authorize]
    [HttpGet("logout")]
    public IActionResult Logout() {
        Response.Cookies.Delete("token");
        return Ok();
    }
}