using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.DTOs;

namespace Server.Services;

// Creates a JWT token
public class TokenService {
    public string GenerateToken(UserAuthDto userAuthDto) {
        var handler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(Configuration.JWT_SECRET);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = GenerateClaimsIdentity(userAuthDto),
            SigningCredentials = credentials,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        var token = handler.CreateToken(tokenDescriptor);

        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaimsIdentity(UserAuthDto userAuthDto) {
        var ci = new ClaimsIdentity();
        ci.AddClaim(new Claim(ClaimTypes.NameIdentifier, userAuthDto.Id.ToString()));
        ci.AddClaim(new Claim(ClaimTypes.Name, userAuthDto.Username));
        ci.AddClaim(new Claim(ClaimTypes.Role, userAuthDto.Role.ToString()));
        return ci;
    }
}