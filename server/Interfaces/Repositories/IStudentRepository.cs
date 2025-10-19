namespace Server.Interfaces.Repositories;

public interface IStudentRepository {
    public Task<Models.Student> GetStudentById(int id);
    public Task<Models.Student> GetStudentByUsername(string username);
    public Task CreateStudent(Models.Student student);
    public Task DeleteStudent(Models.Student student);
    public Task UpdateStudent(Models.Student student);
}