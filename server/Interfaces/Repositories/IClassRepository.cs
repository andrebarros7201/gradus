namespace Server.Interfaces.Repositories;

public interface IClassRepository {
    public Task<int> GetClassCount();
    public Task<Models.Class?> GetClassById(int id);
    public Task<List<Models.Class>> GetAllClasses();
}