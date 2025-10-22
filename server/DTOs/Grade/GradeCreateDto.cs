namespace Server.DTOs.Grade;

public class GradeCreateDto {
    public int Value { get; set; }
    public int SubjectId { get; set; }
    public int StudentId { get; set; }
}