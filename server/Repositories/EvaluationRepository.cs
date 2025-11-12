
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

    public async Task<bool> DeleteEvaluation(Evaluation evaluation) {
        _db.Evaluations.Remove(evaluation);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<Evaluation?> GetEvaluationById(int evaluationId) {
        return await _db.Evaluations.Include(e => e.Grades).ThenInclude(e => e.Student).Include(e => e.Subject).FirstOrDefaultAsync(e => e.Id == evaluationId);
    }

    public Task<Evaluation> UpdateEvaluation(Evaluation evaluation) {
        throw new NotImplementedException();
    }
}