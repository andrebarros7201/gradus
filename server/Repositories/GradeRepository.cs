using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class GradeRepository : IGradeRepository {
    private readonly AppDbContext _db;

    public GradeRepository(AppDbContext db) {
        _db = db;
    }

    public async Task<Grade?> GetGradeById(int id) {
        return await _db.Grades.Include(g => g.Student).Include(g => g.Evaluation).ThenInclude(g => g.Subject).FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<Grade> CreateGrade(Grade grade) {
        await _db.Grades.AddAsync(grade);
        await _db.SaveChangesAsync();

        // Load the subject navigation property
        await _db.Entry(grade).Reference(g => g.Evaluation).LoadAsync();
        await _db.Entry(grade).Reference(g => g.Student).LoadAsync();

        return grade;
    }

    public async Task<Grade> UpdateGrade(Grade grade) {
        _db.Grades.Update(grade);
        await _db.SaveChangesAsync();
        return grade;
    }

    public async Task<bool> DeleteGrade(Grade grade) {
        _db.Grades.Remove(grade);
        await _db.SaveChangesAsync();
        return true;
    }
}