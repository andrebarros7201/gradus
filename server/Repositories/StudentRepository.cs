using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class StudentRepository : IStudentRepository {
    private readonly AppDbContext _db;

    public StudentRepository(AppDbContext db) {
        _db = db;
    }

    public Task<Student> GetStudentById(int id) {
        throw new NotImplementedException();
    }

    public Task<Student> GetStudentByUsername(string username) {
        throw new NotImplementedException();
    }

    public async Task CreateStudent(Student student) {
        await _db.Students.AddAsync(student);
        await _db.SaveChangesAsync();
    }

    public Task DeleteStudent(Student student) {
        throw new NotImplementedException();
    }

    public Task UpdateStudent(Student student) {
        throw new NotImplementedException();
    }
}