using Server.Results;

namespace Server.Interfaces.Services;

public interface IClassService {
    public Task<ServiceResult<List<Models.Class>>> GetAllClasses();
    public Task<ServiceResult<Models.Class?>> GetClassById(int id);
}