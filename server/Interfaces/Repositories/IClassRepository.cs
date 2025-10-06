namespace Server.Interfaces.Repositories;

public interface IClassRepository {
    public Task Create(Models.Class @class);
}