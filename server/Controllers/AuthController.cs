using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Interfaces.Admin;
using Server.Models;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly IAuthService _auth;

    public AuthController(IAuthService authService) {
        _auth = authService;
    }

    [Authorize]
    [HttpGet("verify")]
    public async Task<IActionResult> Verify() {
        IEnumerable<Claim> claims = User.Claims;

        // Convert to Lookup
        ILookup<string, string> claimsLookup = claims.ToLookup(c => c.Type, c => c.Value);

        ServiceResult<UserDto> result = await _auth.GetUserData(
            int.Parse(claimsLookup[ClaimTypes.NameIdentifier].FirstOrDefault()),
            Enum.Parse<Role>(claimsLookup[ClaimTypes.Role].FirstOrDefault())
        );

        return result.Status switch {
            ServiceResultStatus.Success => Ok(result.Data),
            _ => BadRequest(result.Message)
        };
    }
}