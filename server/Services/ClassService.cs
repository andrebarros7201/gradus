using Server.DTOs.Class;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class ClassService : IClassService {
    private readonly IUserRepository _userRepository;

    public ClassService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public async Task<ServiceResult<bool>> Create(ClassRegisterDto dto, int userId) {
        // Check if userId is not null
        if (userId == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
        }

        var user = await _userRepository.GetUserById(userId);

        // Check if user is not null
        if (user == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        // Check if user is not admin
        // Only admin can create classes
        if (user.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
        }

        var newUserClass = new User {
            Username = dto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = Role.Class,
            Class = new Class {
                Name = dto.Name,
                SchoolYear = dto.SchoolYear
            }
        };

        await _userRepository.Create(newUserClass);

        return ServiceResult<bool>.Success(true);
    }
}