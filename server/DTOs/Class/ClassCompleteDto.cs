using Server.DTOs.Student;

namespace Server.DTOs.Class;

public class ClassCompleteDto {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; }

    public List<StudentSimpleDto> Students { get; set; } = [];

    // TODO create the subject logic and related DTOs
    //public List<Subject> Subjects { get; set; } = [];
}
