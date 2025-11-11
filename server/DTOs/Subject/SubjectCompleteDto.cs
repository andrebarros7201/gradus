using Server.DTOs.Grade;

namespace Server.DTOs.Subject;

public class SubjectCompleteDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int ProfessorId { get; set; }
    public string Professor { get; set; } = string.Empty;
    public int ClassId { get; set; }
    public string Class { get; set; } = string.Empty;
    public List<EvaluationDto> Evaluations { get; set; } = [];
}