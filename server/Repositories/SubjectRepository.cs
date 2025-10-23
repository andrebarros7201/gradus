using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class SubjectRepository : ISubjectRepository {
    private readonly AppDbContext _db;

    public SubjectRepository(AppDbContext db) {
        _db = db;
    }

    public async Task<Subject?> GetSubjectById(int id) {
        return await _db.Subjects
            .Include(s => s.Professor).ThenInclude(p => p.User)
            .Include(s => s.Class).ThenInclude(c => c.User)
            .Include(s => s.Grades).ThenInclude(g => g.Student)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Subject> CreateSubject(Subject subject) {
        await _db.Subjects.AddAsync(subject);
        await _db.SaveChangesAsync();
        await _db.Entry(subject).ReloadAsync();

        // Load the navigation properties
        Subject? subjectEntity = await _db.Subjects
            .Include(s => s.Professor).ThenInclude(p => p.User)
            .Include(s => s.Class).ThenInclude(c => c.User)
            .Include(s => s.Grades).ThenInclude(g => g.Student)
            .FirstOrDefaultAsync(s => s.Id == subject.Id);

        return subjectEntity!;
    }

    public async Task<Subject> UpdateSubject(Subject subject) {
        _db.Subjects.Update(subject);
        await _db.SaveChangesAsync();
        await _db.Entry(subject).ReloadAsync();
        return subject;
    }

    public async Task<bool> DeleteSubject(Subject subject) {
        _db.Subjects.Remove(subject);
        await _db.SaveChangesAsync();
        return true;
    }
}