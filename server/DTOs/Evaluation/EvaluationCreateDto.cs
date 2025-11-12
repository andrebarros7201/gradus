public class EvaluationCreateDto {
    public string Name { get; set; } = string.Empty;
    public DateOnly Date { get; set; }
    public EvaluationType EvaluationType { get; set; }
    public int SubjectId { get; set; }
}