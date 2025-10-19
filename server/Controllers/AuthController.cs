using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
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
            return ServiceResult<UserDto>.ReturnStatus(result);
        }

        string token = _tokenService.GenerateToken(new TokenDataDto {
            Id = result.Data.Id,
            Username = result.Data.Username,
            Name = result.Data.Name,
            Role = result.Data.Role
        });

        Response.Cookies.Append("token", token, new CookieOptions {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return ServiceResult<UserDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpGet("logout")]
    public IActionResult Logout() {
        Response.Cookies.Delete("token");
        return Ok();
    }
}