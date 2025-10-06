using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Server.DTOs.Admin;
using Server.DTOs.Class;
using Server.Models;

namespace Server.DTOs;

public class UserDto {
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public Role Role { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public AdminDto? Admin { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ClassDto? Class { get; set; } 
}