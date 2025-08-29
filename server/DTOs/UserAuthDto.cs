using Server.Models;

namespace Server.DTOs;

public class UserAuthDto {
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public Role Role { get; set; }
}