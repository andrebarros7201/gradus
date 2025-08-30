using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.DTOs;

namespace Server.Services;

// Creates a JWT token
public class TokenService {
    public string GenerateToken(UserDto userDto) {
        var handler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(Configuration.JWT_SECRET);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = GenerateClaimsIdentity(userDto),
            SigningCredentials = credentials,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        var token = handler.CreateToken(tokenDescriptor);

        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaimsIdentity(UserDto userDto) {
        var ci = new ClaimsIdentity();
        ci.AddClaim(new Claim(ClaimTypes.NameIdentifier, userDto.Id.ToString()));
        ci.AddClaim(new Claim(ClaimTypes.Name, userDto.Name));
        ci.AddClaim(new Claim("username", userDto.Username));
        ci.AddClaim(new Claim(ClaimTypes.Role, userDto.Role.ToString()));
        return ci;
    }
}