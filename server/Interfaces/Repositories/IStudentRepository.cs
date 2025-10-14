namespace Server.Interfaces.Repositories;

public interface IStudentRepository {
    public Task<Models.Student> GetStudentById(int id);
    public Task<Models.Student> GetStudentByUsername(string username);
    public Task Create(Models.Student student);
    public Task Delete(Models.Student student);
    public Task Update(Models.Student student);
}