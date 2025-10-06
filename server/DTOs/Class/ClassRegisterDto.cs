using System.ComponentModel.DataAnnotations;

namespace Server.DTOs.Class;

public class ClassRegisterDto {
    [Required] public string Name { get; set; } = string.Empty;
    [Required] public string SchoolYear { get; set; } = string.Empty;
    [Required] public string Username { get; set; } = string.Empty;
    [Required] public string Password { get; set; } = string.Empty;
}