using Server.DTOs.Class;
using Server.DTOs.Grade;
using Server.Models;

namespace Server.DTOs.Student;

public class StudentCompleteDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ClassSimpleDto Class { get; set; }
    public List<GradeSimpleDto> Grades { get; set; } = [];
}
