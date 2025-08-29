using System.ComponentModel.DataAnnotations;

namespace Server.DTOs.Admin;

public class AdminRegisterDto {
    [Required]
    [MinLength(3)]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    [MaxLength(100)]
    public string Password { get; set; } = string.Empty;

}