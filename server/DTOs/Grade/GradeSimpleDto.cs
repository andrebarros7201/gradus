namespace Server.DTOs.Grade;

public class GradeSimpleDto {
    public int Id { get; set; }
    public int Value { get; set; }
    public int SubjectId { get; set; }
    public int StudentId { get; set; }
}