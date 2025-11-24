using Server.DTOs.Class;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IClassService {
    public Task<ServiceResult<List<ClassSimpleDto>>> GetAllClasses(int page);
    public Task<ServiceResult<ClassCompleteDto?>> GetClassById(int id);
}
