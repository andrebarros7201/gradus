namespace Server.DTOs.User;

public class UserUpdateDto {
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string? Password { get; set; } = string.Empty;
    // Class
    public string? SchoolYear { get; set; } = string.Empty;
    public bool? IsActive { get; set; }
}