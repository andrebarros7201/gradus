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

    public Task Create(Student student) {
        throw new NotImplementedException();
    }

    public Task Delete(Student student) {
        throw new NotImplementedException();
    }

    public Task Update(Student student) {
        throw new NotImplementedException();
    }
}