using Server.Models;

namespace Server.Interfaces.Repositories;

public interface IStudentRepository {
    public Task<(List<Student>, int numberPages)> GetAllStudents(int page);
    public Task<Student?> GetStudentById(int id);
    public Task<Student> CreateStudent(Student student);
    public Task<Student> UpdateStudent(Student student);
    public Task DeleteStudent(Models.Student student);
}