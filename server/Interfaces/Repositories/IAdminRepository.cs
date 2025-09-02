namespace Server.Interfaces.Repositories;

public interface IAdminRepository {
    Task Create(Models.Admin admin);
}