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
    public async Task<int> GetAllStudentsCount() {
        return await _db.Students.CountAsync();
    }

    public async Task<List<Student>> GetAllStudents() {
        return await _db.Students.Include(s => s.Classes).ToListAsync();
    }

    public async Task<Student?> GetStudentById(int id) {
        return await _db.Students
            .Include(s => s.Classes).ThenInclude(c => c.User)
            .Include(s => s.Grades).ThenInclude(g => g.Evaluation).ThenInclude(e => e.Subject)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Student> CreateStudent(Student student) {
        await _db.Students.AddAsync(student);
        await _db.SaveChangesAsync();

        await _db.Entry(student).ReloadAsync();

        return (await _db.Students
            .Include(s => s.Classes).ThenInclude(c => c.User)
            .Include(s => s.Grades).ThenInclude(g => g.Evaluation).ThenInclude(g => g.Subject)
            .FirstOrDefaultAsync(s => s.Id == student.Id))!;
    }

    public async Task<Student> UpdateStudent(Student student) {
        _db.Update(student);
        await _db.SaveChangesAsync();
        await _db.Entry(student).ReloadAsync();
        return student;
    }

    public async Task DeleteStudent(Student student) {
        _db.Students.Remove(student);
        await _db.SaveChangesAsync();
    }

}