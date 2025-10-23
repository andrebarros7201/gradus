namespace Server.DTOs.Subject;

public class SubjectCreateDto {
    public string Name { get; set; } = string.Empty;
    public int ProfessorId { get; set; }
    public int ClassId { get; set; }
}