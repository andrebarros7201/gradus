using Server.DTOs;
using Server.DTOs.Admin;
using Server.Interfaces.Admin;
using Server.Interfaces.Repositories;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class AdminService : IAdminService {
    private readonly IAdminRepository _adminRepository;

    public AdminService(IAdminRepository adminRepository) {
        _adminRepository = adminRepository;
    }

    public async Task<ServiceResult<UserDto>> Login(AdminLoginDto dto) {
        var user = await _adminRepository.GetAdminByUsername(dto.Username);

        // User not found
        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "Admin not found!");
        }

        // Check password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);

        if (!isPasswordValid) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.Unauthorized, "Invalid credentials!");
        }

        return ServiceResult<UserDto>.Success(new UserDto {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username,
            Role = Role.Admin
        });
    }

    public async Task<ServiceResult<bool>> Register(AdminRegisterDto registerDto) {
        var admin = await _adminRepository.GetAdminByUsername(registerDto.Username);

        // Username already exists
        if (admin != null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Conflict, "Username already exists!");
        }

        var newAdmin = new Models.Admin {
            Name = registerDto.Name,
            Username = registerDto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
        };

        await _adminRepository.Create(newAdmin);
        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<UserDto>> GetAdminById(int id) {
        var user = await _adminRepository.GetAdminById(id);

        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "Admin not found!");
        }

        return ServiceResult<UserDto>.Success(new UserDto {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username,
            Role = Role.Admin
        });
    }
}