using Server.DTOs;
using Server.DTOs.User;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IUserService {
    public Task<ServiceResult<bool>> Create(UserRegisterDto dto, int? userId);
    public Task<ServiceResult<bool>> Delete(int id, int currentUserId);
    public Task<ServiceResult<UserDto>> Update(int targetUserId, int currentUserId, UserPatchDto dto);
}
