using System.Diagnostics;
using Server.DTOs;
using Server.DTOs.User;
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


    // Logic for creating a user
    // If it's a new admin, no need to check for userId and validate it
    // If it's not an admin, check the userId and validate it (see if it exists and is an admin)
    public async Task<ServiceResult<bool>> Create(UserCreateDto dto, int? userId) {
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

        switch (dto.Role) {
            case Role.Admin:
                newUser.Admin = new Admin { };
                break;

            case Role.Class:
                newUser.Class = new Class { };
                break;

            case Role.Professor:
                newUser.Professor = new Professor { };
                break;
            default:
                return ServiceResult<bool>.Error(ServiceResultStatus.BadRequest, "Invalid role");
        }

        if (dto.Role != Role.Admin) {
            if (userId == null) {
                return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
            }

            // Need to use .Value because the user id is an int?
            var currentUser = await _userRepository.GetUserById(userId.Value);

            if (currentUser.Role != Role.Admin) {
                return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
            }
        }

        await _userRepository.Create(newUser);

        return ServiceResult<bool>.Success(true);
        /*
        var user = await _userRepository.GetUserById(userId);

        // If the new user is not an admin
        if (dto.Role != Role.Admin) {
            if (userId == null) {
                return ServiceResult<bool>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
            }

            if (user == null) {
                return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "User not found");
            }
        }

        // If the current user is not an admin
        if (dto.Role != Role.Admin && user.Role != Role.Admin) {
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
        */
    }

}