namespace Server.Interfaces.Repositories;

public interface IAdminRepository {
    public Task Create(Models.Admin admin);
}