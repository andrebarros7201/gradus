using Server.DTOs.Grade;

public class EvaluationDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateOnly Date { get; set; }
    public int SubjectId { get; set; }
    public List<GradeSimpleDto> Grades { get; set; } = [];
}