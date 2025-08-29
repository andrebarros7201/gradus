namespace Server.Interfaces.Repositories;

public interface IAdminRepository {
    Task<Models.Admin> GetAdminByUsername(string username);
    Task<Models.Admin> GetAdminById(int id);
    Task Create(Models.Admin admin);
}