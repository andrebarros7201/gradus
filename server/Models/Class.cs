namespace Server.Models;

public class Class {
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string SchoolYear { get; set; }
    public Role Role { get; set; } = Role.Class;
    public List<ClassStudents> Students { get; set; }
    public List<ClassSubject> Subjects { get; set; }
    public bool IsActive { get; set; }
}