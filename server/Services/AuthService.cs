using Server.Data;
using Server.DTOs;
using Server.Interfaces.Admin;
using Server.Interfaces.Repositories;
using Server.Models;
using Server.Repositories;
using Server.Results;

namespace Server.Services;

public class AuthService : IAuthService {
    private readonly IAdminRepository _adminRepository;

    public AuthService(IAdminRepository adminRepository) {
        _adminRepository = adminRepository;
    }

    public async Task<ServiceResult<UserDto>> GetUserData(int Id, Role role) {
        if (Id == null || role == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.BadRequest, "Invalid parameters!");
        }

        var user = role switch {
            Role.Admin => await _adminRepository.GetAdminById(Id),
            _ => null
        };

        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found!");
        }

        return ServiceResult<UserDto>.Success(new UserDto {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username,
            Role = role
        });
    }
}