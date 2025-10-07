using System.Runtime.InteropServices;
using Server.DTOs.Class;
using Server.Models;

namespace Server.DTOs;

public class UserCreateDto {
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public Role Role { get; set; }

    // Extra field for creating a user class
    public ClassRegisterDto? Class { get; set; }
}