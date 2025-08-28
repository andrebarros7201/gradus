namespace Server.Models;

public class ClassStudents {
    public int StudentId { get; set; }
    public Student Student { get; set; }

    public int ClassId { get; set; }
    public Class Class { get; set; }
}