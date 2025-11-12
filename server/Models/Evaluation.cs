using Server.Models;

public class Evaluation {
    public int Id { get; set; }
    public string Name { get; set; }
    public DateOnly Date { get; set; }
    public EvaluationType EvaluationType { get; set; }
    public List<Grade> Grades { get; set; } = [];

    public int SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;
}