
using Microsoft.EntityFrameworkCore;
using Server.Data;

public class EvaluationRepository : IEvaluationRepository {
    private readonly AppDbContext _db;

    public EvaluationRepository(AppDbContext db) {
        _db = db;
    }
    public async Task<Evaluation> CreateEvaluation(Evaluation evaluation) {
        await _db.Evaluations.AddAsync(evaluation);
        await _db.SaveChangesAsync();

        // Load the evaluation navigation property
        await _db.Entry(evaluation).Collection(e => e.Grades).LoadAsync();
        await _db.Entry(evaluation).Reference(e => e.Subject).LoadAsync();

        return evaluation;
    }

    public async Task<bool> DeleteEvaluation(Evaluation evaluation) {
        _db.Evaluations.Remove(evaluation);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<Evaluation?> GetEvaluationById(int evaluationId) {
        return await _db.Evaluations.Include(e => e.Grades).ThenInclude(e => e.Student).Include(e => e.Subject).FirstOrDefaultAsync(e => e.Id == evaluationId);
    }

    public async Task<Evaluation> UpdateEvaluation(Evaluation evaluation) {
        _db.Evaluations.Update(evaluation);
        await _db.SaveChangesAsync();
        return evaluation;
    }
}