namespace Server.Interfaces.Repositories;

public interface IUserRepository {
    public Task<Models.User> GetUserById(int id);
    public Task<Models.User> GetUserByUsername(string username);
    public Task Create(Models.User user);
}