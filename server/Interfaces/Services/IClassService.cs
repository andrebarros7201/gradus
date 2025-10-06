using Server.DTOs.Class;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IClassService {
    public Task<ServiceResult<bool>> Create(ClassRegisterDto dto, int userId);
}