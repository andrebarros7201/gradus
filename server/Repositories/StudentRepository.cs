using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class StudentRepository : IStudentRepository {
    private readonly AppDbContext _db;

    public StudentRepository(AppDbContext db) {
        _db = db;
    }

    public async Task<Student?> GetStudentById(int id) {
        return await _db.Students
            .Include(s => s.Classes).ThenInclude(c => c.User)
            .Include(s => s.Grades).ThenInclude(g => g.Subject)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task CreateStudent(Student student) {
        await _db.Students.AddAsync(student);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteStudent(Student student) {
        _db.Students.Remove(student);
        await _db.SaveChangesAsync();
    }

    public Task UpdateStudent(Student student) {
        throw new NotImplementedException();
    }
}