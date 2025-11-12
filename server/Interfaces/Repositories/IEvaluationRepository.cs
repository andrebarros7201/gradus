public interface IEvaluationRepository {
    public Task<List<EvaluationDto>> GetEvaluationByClassId(int classId);
    public Task<EvaluationDto?> GetEvaluationById(int evaluationId);
    public Task<EvaluationDto> CreateEvaluation(Evaluation evaluation);
    public Task<EvaluationDto> UpdateEvaluation(Evaluation evaluation);
    public Task<bool> DeleteEvaluation(int evaluationId);
}