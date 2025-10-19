using Server.Models;

namespace Server.DTOs.Student;

public class StudentCompleteDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // TODO create a GradeDto
    // public List<Grade> Grades { get; set; } = [];
    public int ClassId { get; set; }
}
