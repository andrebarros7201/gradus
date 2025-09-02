using System.ComponentModel.DataAnnotations;
using Server.Models;

namespace Server.DTOs;

public class UserDto {
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Role Role { get; set; }
}