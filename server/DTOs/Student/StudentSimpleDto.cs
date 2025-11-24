using System.Diagnostics;
using System.Text.Json.Serialization;

namespace Server.DTOs.Student;

public class StudentSimpleDto {
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public string ClassName { get; set; } = String.Empty;
}