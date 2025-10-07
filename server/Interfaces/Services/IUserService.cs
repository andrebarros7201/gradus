using Server.DTOs;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IUserService {
    public Task<ServiceResult<bool>> Create(UserCreateDto dto, int userId);
}