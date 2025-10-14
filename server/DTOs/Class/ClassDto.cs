namespace Server.DTOs.Class;

public class ClassDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}