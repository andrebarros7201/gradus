using System.Text.Json.Serialization;

namespace Server.DTOs.Grade;

public class GradeSimpleDto {
    public int Id { get; set; }
    public int Value { get; set; }
    public string SubjectName { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int StudentId { get; set; }
    
}