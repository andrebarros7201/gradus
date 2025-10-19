using System.Text.Json.Serialization;

namespace Server.DTOs.Subject;

public class SubjectSimpleDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // Not useful when fetching a professor's subjects'
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int ProfessorId { get; set; }
}