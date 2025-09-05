using Server.DTOs;
using Server.DTOs.Admin;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class AuthService : IAuthService {
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public async Task<ServiceResult<UserDto>> Login(UserLoginDto dto) {
        var user = await _userRepository.GetUserByUsername(dto.Username);

        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);

        if (!isPasswordValid) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.Unauthorized, "Invalid credentials");
        }

        return user.Role switch {
            Role.Admin => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                Admin = new AdminDto {
                    Id = user.Admin.Id,
                    Name = user.Admin.Name
                }
            })
        };
    }

    public async Task<ServiceResult<UserDto>> FetchUser(int id) {
        var user = await _userRepository.GetUserById(id);
        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        return ServiceResult<UserDto>.Success(new UserDto {
            Id = user.Id,
            Username = user.Username,
            Role = user.Role,
            Admin = new AdminDto {
                Id = user.Admin.Id,
                Name = user.Admin.Name
            }
        });
    }
}