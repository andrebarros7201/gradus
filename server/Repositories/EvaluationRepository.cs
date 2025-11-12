
using Server.Data;

public class EvaluationRepository : IEvaluationRepository {
    private readonly AppDbContext _db;

    public EvaluationRepository(AppDbContext db) {
        _db = db;
    }
    public Task<EvaluationDto> CreateEvaluation(Evaluation evaluation) {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteEvaluation(int evaluationId) {
        throw new NotImplementedException();
    }

    public Task<List<EvaluationDto>> GetEvaluationByClassId(int classId) {
        throw new NotImplementedException();
    }

    public Task<EvaluationDto?> GetEvaluationById(int evaluationId) {
        throw new NotImplementedException();
    }

    public Task<EvaluationDto> UpdateEvaluation(Evaluation evaluation) {
        throw new NotImplementedException();
    }
}