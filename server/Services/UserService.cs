using System.Diagnostics;
using Server.DTOs;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class UserService : IUserService {
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }


    public async Task<ServiceResult<bool>> Create(UserCreateDto dto, int userId) {
        if (userId == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
        }

        var user = await _userRepository.GetUserById(userId);

        if (user == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (user.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "User is not admin");
        }

        var existingUser = await _userRepository.GetUserByUsername(dto.Username);

        if (existingUser != null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        var newUser = new User {
            Username = dto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = Role.Admin,
            Name = dto.Name
        };

        switch (user.Role) {
            case Role.Admin:
                newUser.Admin = new Admin { };
                break;

            case Role.Class:
                newUser.Class = new Class { };
                break;

            case Role.Professor:
                newUser.Professor = new Professor { };
                break;
        }

        await _userRepository.Create(newUser);
        return ServiceResult<bool>.Success(true);
    }

}