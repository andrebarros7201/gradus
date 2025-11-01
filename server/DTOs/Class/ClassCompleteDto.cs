using Server.DTOs.Student;
using Server.DTOs.Subject;

namespace Server.DTOs.Class;

public class ClassCompleteDto {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public List<StudentSimpleDto> Students { get; set; } = [];
    public List<SubjectSimpleDto> Subjects { get; set; } = [];
}
