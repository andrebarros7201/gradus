namespace Server.Models;

public class Class {
    public int Id { get; set; }
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public User User { get; set; } = null!;
    public int UserId { get; set; }

    public List<Student> Students { get; set; } = [];
    public List<Subject> Subjects { get; set; } = [];
}