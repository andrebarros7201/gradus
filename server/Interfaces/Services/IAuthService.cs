using Server.DTOs;
using Server.Models;
using Server.Results;

namespace Server.Interfaces.Admin;

public interface IAuthService {
    public Task<ServiceResult<UserDto>> GetUserData(int Id, Role role);
}