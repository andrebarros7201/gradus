public interface IEvaluationRepository {
    public Task<Evaluation?> GetEvaluationById(int evaluationId);
    public Task<Evaluation> CreateEvaluation(Evaluation evaluation);
    public Task<Evaluation> UpdateEvaluation(Evaluation evaluation);
    public Task<bool> DeleteEvaluation(Evaluation evaluation);
}