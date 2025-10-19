using Server.DTOs;
using Server.DTOs.Admin;
using Server.DTOs.Class;
using Server.DTOs.Professor;
using Server.DTOs.Subject;
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
        // Fetch user by username
        var user = await _userRepository.GetUserByUsername(dto.Username);

        // Early return if user is null
        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.BadRequest, "Invalid credentials");
        }

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);

        if (!isPasswordValid) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.BadRequest, "Invalid credentials");
        }

        return user.Role switch {
            Role.Admin => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Role = user.Role,
                Admin = new AdminDto {
                    Id = user.Admin!.Id
                }
            }),
            Role.Class => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Role = user.Role,
                Class = new ClassSimpleDto {
                    Id = user.Class!.Id,
                    Name = user.Class.User.Name,
                    SchoolYear = user.Class.SchoolYear,
                    IsActive = user.Class.IsActive
                }
            }),
            Role.Professor => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Role = user.Role,
                Professor = new ProfessorDto {
                    Id = user.Professor!.Id,
                    Subjects = user.Professor.Subjects.Select(s => new SubjectSimpleDto { Id = s.Id, Name = s.Name }).ToList()
                }
            })
        };
    }

}
