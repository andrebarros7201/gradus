using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.DTOs;

namespace Server.Services;

// Creates a JWT token
public class TokenService {
    public string GenerateToken(TokenDataDto tokenDataDto) {
        var handler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(Configuration.JWT_SECRET);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = GenerateClaimsIdentity(tokenDataDto),
            SigningCredentials = credentials,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        var token = handler.CreateToken(tokenDescriptor);

        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaimsIdentity(TokenDataDto tokenDataDto) {
        var ci = new ClaimsIdentity();
        ci.AddClaim(new Claim(ClaimTypes.NameIdentifier, tokenDataDto.Id.ToString()));
        ci.AddClaim(new Claim(ClaimTypes.Name, tokenDataDto.Name));
        ci.AddClaim(new Claim("username", tokenDataDto.Username));
        ci.AddClaim(new Claim(ClaimTypes.Role, tokenDataDto.Role.ToString()));
        return ci;
    }
}