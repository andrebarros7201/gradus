using System.Diagnostics;
using Server.DTOs;
using Server.DTOs.Admin;
using Server.DTOs.Class;
using Server.DTOs.Professor;
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
    public async Task<ServiceResult<bool>> Create(UserRegisterDto dto, int? userId) {
        var existingUser = await _userRepository.GetUserByUsername(dto.Username);

        if (existingUser != null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        var newUser = new User {
            Username = dto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Name = dto.Name
        };

        switch (dto.Role) {
            case Role.Admin:
                newUser.Role = Role.Admin;
                newUser.Admin = new Admin { };
                break;

            case Role.Class:
                newUser.Role = Role.Class;
                newUser.Class = new Class {
                    SchoolYear = dto.Class.SchoolYear
                };
                break;

            case Role.Professor:
                newUser.Role = Role.Professor;
                newUser.Professor = new Professor { };
                break;
            default:
                return ServiceResult<bool>.Error(ServiceResultStatus.BadRequest, "Invalid role");
        }

        if (dto.Role != Role.Admin) {
            if (userId == null) {
                return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create this user");
            }

            // Need to use .Value because the user id is an int?
            var currentUser = await _userRepository.GetUserById(userId.Value);

            if (currentUser.Role != Role.Admin) {
                return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create this user");
            }
        }

        await _userRepository.Create(newUser);

        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<bool>> Delete(int id, int currentUserId) {
        var currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        if (currentUser.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to delete this user");
        }

        var targetUser = await _userRepository.GetUserById(id);

        if (targetUser == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Target user not found");
        }

        await _userRepository.Delete(targetUser);

        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<UserDto>> Update(int targetUserId, int currentUserId, UserPatchDto dto) {
        var currentUser = await _userRepository.GetUserById(currentUserId);

        // Ensure the current user exists
        if (currentUser == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        // Check if the user is an admin or the user to be updated is the same as the current user
        if (currentUser.Role != Role.Admin && currentUserId != targetUserId) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to update this user");
        }

        // Check if the username is already in use
        var existingUserWithSameUsername = await _userRepository.GetUserByUsername(dto.Username);

        if (existingUserWithSameUsername != null && existingUserWithSameUsername.Id != targetUserId) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        // Get the target user
        var targetUser = await _userRepository.GetUserById(targetUserId);

        // Ensure the target user exists
        if (targetUser == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "Target user not found");
        }

        // Update the user
        targetUser.Name = dto.Name;
        targetUser.Username = dto.Username;
        targetUser.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        // Update the user in the database
        await _userRepository.Update(targetUser);

        // Return the updated user based on the role
        return ServiceResult<UserDto>.Success(new UserDto {
                Id = targetUser.Id,
                Name = targetUser.Name,
                Username = targetUser.Username,
                Role = targetUser.Role,
                Class = targetUser.Role switch {
                    Role.Class => new ClassDto {
                        Id = targetUser.Class.Id,
                        SchoolYear = targetUser.Class.SchoolYear,
                        IsActive = targetUser.Class.IsActive
                    },
                    _ => null
                },
                Admin = targetUser.Role switch {
                    Role.Admin => new AdminDto {
                        Id = targetUser.Admin.Id
                    },
                    _ => null
                },
                Professor = targetUser.Role switch {
                    Role.Professor => new ProfessorDto {
                        Id = targetUser.Professor.Id
                    },
                    _ => null
                }
            }
        );
    }
}