using Server.DTOs.Subject;

namespace Server.DTOs.Professor;

public class ProfessorDto {
    public int Id { get; set; }
    public List<SubjectSimpleDto> Subjects { get; set; } = [];
}