using Server.Models;

namespace Server.DTOs.Professor;

public class ProfessorDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<Subject> Subjects { get; set; } = [];
}