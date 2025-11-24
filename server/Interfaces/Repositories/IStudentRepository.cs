using Server.Models;

namespace Server.Interfaces.Repositories;

public interface IStudentRepository {
    public Task<int> GetAllStudentsCount();
    public Task<List<Student>> GetAllStudents();
    public Task<Student?> GetStudentById(int id);
    public Task<Student> CreateStudent(Student student);
    public Task<Student> UpdateStudent(Student student);
    public Task DeleteStudent(Models.Student student);
}