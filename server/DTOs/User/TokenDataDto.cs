using Server.Models;

namespace Server.DTOs;

public class TokenDataDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public Role Role { get; set; }
}