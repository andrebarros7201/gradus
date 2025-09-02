using Server.DTOs;
using Server.DTOs.Admin;
using Server.Interfaces.Admin;
using Server.Interfaces.Repositories;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class AdminService : IAdminService {
    private readonly IAdminRepository _adminRepository;
    private readonly IUserRepository _userRepository;

    public AdminService(IAdminRepository adminRepository, IUserRepository userRepository) {
        _adminRepository = adminRepository;
        _userRepository = userRepository;
    }

    public async Task<ServiceResult<bool>> Register(AdminRegisterDto registerDto) {
        var user = await _userRepository.GetUserByUsername(registerDto.Username);

        // Check if username already exists
        if (user != null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        // Create user and admin
        var newUser = new User {
            Username = registerDto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
            Role = Role.Admin,
            Admin = new Admin {
                Name = registerDto.Name
            }
        };

        await _userRepository.Create(newUser);
        
        return ServiceResult<bool>.Success(true);
    }

}