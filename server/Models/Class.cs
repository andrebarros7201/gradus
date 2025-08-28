namespace Server.Models;

public class Class {
    public int Id { get; set; }
    public string Name { get; set; }
    public string SchoolYear { get; set; }
    public List<ClassStudents> Students { get; set; }
    public List<ClassSubject> Subjects { get; set; }
    public bool IsActive { get; set; }
    public User? User { get; set; }
}