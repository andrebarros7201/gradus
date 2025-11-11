namespace Server.DTOs.Grade;

public class GradeCreateDto {
    public int Value { get; set; }
    public int EvaluationId { get; set; }
    public int StudentId { get; set; }
}