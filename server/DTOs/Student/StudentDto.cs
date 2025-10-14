using Server.Models;

namespace Server.DTOs.Student;

public class StudentDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<Grade> Grades { get; set; } = [];
    public int ClassId { get; set; }
}