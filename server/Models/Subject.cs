namespace Server.Models;

public class Subject {
    public int Id { get; set; }
    public string Name { get; set; }

    public Class Class { get; set; }
    public int ClassId { get; set; }

    public List<Evaluation> Evaluations { get; set; } = [];

    public Professor Professor { get; set; }
    public int ProfessorId { get; set; }
}