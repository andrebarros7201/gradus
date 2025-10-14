namespace Server.Models;

public class Subject {
    public int Id { get; set; }
    public string Name { get; set; }
    public string SchoolYear { get; set; }

    public List<Class> Classes { get; set; }
    public List<Grade> Grades { get; set; }

    public Professor Professor { get; set; }
    public int ProfessorId { get; set; }

    public bool IsActive { get; set; }
}