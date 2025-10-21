using Server.Models;

namespace Server.Interfaces.Repositories;

public interface IStudentRepository {
    public Task<Student?> GetStudentById(int id);
    public Task CreateStudent(Models.Student student);
    public Task DeleteStudent(Models.Student student);
    public Task UpdateStudent(Models.Student student);
}