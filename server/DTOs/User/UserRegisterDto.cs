using Server.DTOs.Class;
using Server.Models;

namespace Server.DTOs.User;

public class UserRegisterDto {
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public Role Role { get; set; }

    // Extra field for creating a new class user
    public ClassRegisterDto? Class { get; set; }
}