using System.Text.Json.Serialization;

namespace Server.DTOs.Grade;

public class GradeSimpleDto {
    public int Id { get; set; }
    public int Value { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string SubjectName { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int StudentId { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string StudentName { get; set; }
    
}