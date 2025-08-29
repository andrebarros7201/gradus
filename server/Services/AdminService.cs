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

    public async Task<ServiceResult<AdminDto>> Login(AdminLoginDto dto) {
        var user = await _adminRepository.GetAdminByUsername(dto.Username);

        // User not found
        if (user == null) {
            return ServiceResult<AdminDto>.Error(ServiceResultStatus.NotFound, "Admin not found!");
        }

        // Check password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);

        if (!isPasswordValid) {
            return ServiceResult<AdminDto>.Error(ServiceResultStatus.Unauthorized, "Invalid credentials!");
        }

        return ServiceResult<AdminDto>.Success(new AdminDto {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username
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

    public async Task<ServiceResult<AdminDto>> GetAdminById(int id) {
        var user = await _adminRepository.GetAdminById(id);

        if (user == null) {
            return ServiceResult<AdminDto>.Error(ServiceResultStatus.NotFound, "Admin not found!");
        }

        return ServiceResult<AdminDto>.Success(new AdminDto {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username
        });
    }
}