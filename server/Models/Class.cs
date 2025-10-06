namespace Server.Models;

public class Class {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public User User { get; set; }
    public int UserId { get; set; }

    public List<ClassStudents> Students { get; set; } = [];
    public List<ClassSubject> Subjects { get; set; } = [];
}