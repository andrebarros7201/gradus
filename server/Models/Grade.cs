namespace Server.Models;

public class Grade {
    public int Id { get; set; }
    public int Value { get; set; }

    public Student Student { get; set; } = null!;
    public int StudentId { get; set; }

    public Evaluation Evaluation { get; set; } = null!;
    public int EvaluationId { get; set; }
}