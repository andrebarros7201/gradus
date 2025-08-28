namespace Server.Models;

public class Student {
    public int Id { get; set; }
    public string Name { get; set; }
    public List<ClassStudents> Classes { get; set; }
    public List<Grade> Grades { get; set; }
}