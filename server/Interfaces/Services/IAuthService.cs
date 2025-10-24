using Server.DTOs;
using Server.DTOs.User;
using Server.Models;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IAuthService {
    public Task<ServiceResult<UserDto>> Login(UserLoginDto dto);
}