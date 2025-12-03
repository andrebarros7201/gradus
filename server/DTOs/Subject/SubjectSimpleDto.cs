using System.Text.Json.Serialization;

namespace Server.DTOs.Subject;

public class SubjectSimpleDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // Not useful when fetching a professor's subjects'
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public string Class { get; set; }
    
    // Not useful when fetching a professor's subjects'
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public string Professor { get; set; }
}