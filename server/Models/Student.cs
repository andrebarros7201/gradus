namespace Server.Models;

public class Student {
    public int Id { get; set; }
    public string Name { get; set; }

    // Many-to-many: a student can be enrolled in multiple classes (current and past)
    public List<Class> Classes { get; set; } = [];

    public List<Grade> Grades { get; set; } = [];
}