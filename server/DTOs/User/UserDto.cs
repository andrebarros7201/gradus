using System.ComponentModel.DataAnnotations;
using Server.DTOs.Admin;
using Server.Models;

namespace Server.DTOs;

public class UserDto {
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public Role Role { get; set; }
    public AdminDto? Admin { get; set; }
}