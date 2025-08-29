using Server.DTOs.Admin;
using Server.Interfaces.Admin;
using Server.Interfaces.Repositories;
using Server.Results;

namespace Server.Services;

public class AdminService : IAdminService {
    private readonly IAdminRepository _adminRepository;

    public AdminService(IAdminRepository adminRepository) {
        _adminRepository = adminRepository;
    }

    public Task<ServiceResult<AdminDto>> Login(AdminLoginDto dto) {
        throw new NotImplementedException();
    }

    public async Task<ServiceResult<bool>> Register(AdminRegisterDto registerDto) {
        var admin = await _adminRepository.GetAdminByUsername(registerDto.Username);

        // Username already exists
        if (admin != null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        var newAdmin = new Models.Admin {
            Name = registerDto.Name,
            Username = registerDto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
        };

        await _adminRepository.Create(newAdmin);
        return ServiceResult<bool>.Success(true);
    }
}