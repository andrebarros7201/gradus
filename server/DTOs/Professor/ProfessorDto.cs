using Server.DTOs.Subject;
using Server.Models;

namespace Server.DTOs.Professor;

public class ProfessorDto {
    public int Id { get; set; }
    public List<SubjectSimpleDto> Subjects { get; set; } = [];
}