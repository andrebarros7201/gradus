using Server.DTOs.Professor;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class ProfessorService : IProfessorService {
    private readonly IUserRepository _userRepository;

    public ProfessorService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public async Task<ServiceResult<bool>> Create(ProfessorRegisterDto dto, int userId) {
        // Check if userId is not null
        if (userId == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Error, "User Id not provided");
        }

        var user = await _userRepository.GetUserById(userId);

        // Check if user is not null
        if (user == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        // Check if user is not admin
        // Only admin can create professors
        if (user.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "User is not admin");
        }

        var newUser = new User {
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Username = dto.Username,
            Role = Role.Professor,
            Professor = new Professor {
                Name = dto.Name
            }
        };

        await _userRepository.Create(newUser);

        return ServiceResult<bool>.Success(true);
    }
}