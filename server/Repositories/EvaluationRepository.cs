
using Microsoft.EntityFrameworkCore;
using Server.Data;

public class EvaluationRepository : IEvaluationRepository {
    private readonly AppDbContext _db;

    public EvaluationRepository(AppDbContext db) {
        _db = db;
    }
    public Task<Evaluation> CreateEvaluation(Evaluation evaluation) {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteEvaluation(int evaluationId) {
        throw new NotImplementedException();
    }

    public async Task<Evaluation?> GetEvaluationById(int evaluationId) {
        return await _db.Evaluations.Include(e => e.Grades).FirstOrDefaultAsync(e => e.Id == evaluationId);
    }

    public Task<Evaluation> UpdateEvaluation(Evaluation evaluation) {
        throw new NotImplementedException();
    }
}