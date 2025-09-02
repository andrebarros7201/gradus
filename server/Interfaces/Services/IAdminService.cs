using Server.DTOs;
using Server.DTOs.Admin;
using Server.Results;

namespace Server.Interfaces.Admin;

public interface IAdminService {
    public Task<ServiceResult<bool>> Register(AdminRegisterDto registerDto);
}