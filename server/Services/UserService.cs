using Server.DTOs.Admin;
using Server.DTOs.Class;
using Server.DTOs.Professor;
using Server.DTOs.Student;
using Server.DTOs.Subject;
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

    public async Task<ServiceResult<UserDto>> FetchUser(int id) {
        // Fetch user by id
        User? user = await _userRepository.GetUserById(id);

        if (user == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        return user.Role switch {
            Role.Admin => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Role = user.Role,
                Admin = new AdminDto { Id = user.Admin!.Id }
            }),
            Role.Class => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                Name = user.Name,
                Class = new ClassCompleteDto {
                    Id = user.Class!.Id,
                    UserId = user.Class.User.Id,
                    Name = user.Class.User.Name,
                    Username = user.Class.User.Username,
                    SchoolYear = user.Class.SchoolYear,
                    IsActive = user.Class.IsActive,
                    Students = user.Class.Students.Select(s => new StudentSimpleDto { Id = s.Id, Name = s.Name }).ToList(),
                    Subjects = user.Class.Subjects.Select(s => new SubjectSimpleDto { Id = s.Id, Name = s.Name, Professor = s.Professor.User.Name })
                        .ToList()
                }
            }),
            Role.Professor => ServiceResult<UserDto>.Success(new UserDto {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                Name = user.Name,
                Professor = new ProfessorDto {
                    Id = user.Professor!.Id,
                    Subjects = user.Professor.Subjects.Select(s => new SubjectSimpleDto {
                            Id = s.Id,
                            Name = s.Name,
                            Class = s.Class.User.Name
                        })
                        .ToList()
                }
            }),
            _ => ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found")
        };
    }

    // Only admins can create users
    public async Task<ServiceResult<string>> Create(UserRegisterDto dto, int userId) {
        // Fetch the current user
        User? currentUser = await _userRepository.GetUserById(userId);

        if (currentUser == null) {
            return ServiceResult<string>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        if (currentUser.Role != Role.Admin) {
            return ServiceResult<string>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create this user");
        }

        User? existingUser = await _userRepository.GetUserByUsername(dto.Username);

        if (existingUser != null) {
            return ServiceResult<string>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        var newUser = new User {
            Username = dto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Name = dto.Name
        };

        switch (dto.Role) {
            case Role.Admin:
                newUser.Role = Role.Admin;
                newUser.Admin = new Admin();
                break;

            case Role.Class:
                newUser.Role = Role.Class;
                newUser.Class = new Class {
                    SchoolYear = dto.Class!.SchoolYear
                };
                break;

            case Role.Professor:
                newUser.Role = Role.Professor;
                newUser.Professor = new Professor();
                break;
            default:
                return ServiceResult<string>.Error(ServiceResultStatus.BadRequest, "Invalid role");
        }

        await _userRepository.Create(newUser);

        string message = dto.Role switch {
            Role.Admin => "Admin created successfully",
            Role.Class => "Class created successfully",
            Role.Professor => "Professor created successfully",
            _ => "User created successfully"
        };
        return ServiceResult<string>.Success(message);
    }

    public async Task<ServiceResult<string>> Delete(int id, int currentUserId) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<string>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        if (currentUser.Role != Role.Admin) {
            return ServiceResult<string>.Error(ServiceResultStatus.Forbidden, "You are not authorized to delete this user");
        }

        User? targetUser = await _userRepository.GetUserById(id);

        if (targetUser == null) {
            return ServiceResult<string>.Error(ServiceResultStatus.NotFound, "Target user not found");
        }

        await _userRepository.Delete(targetUser);

        return ServiceResult<string>.Success("User deleted successfully");
    }

    public async Task<ServiceResult<UserDto>> Update(int targetUserId, int currentUserId, UserUpdateDto dto) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        // Ensure the current user exists
        if (currentUser == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        // Check if the user is an admin or the user to be updated is the same as the current user
        if (currentUser.Role != Role.Admin && currentUserId != targetUserId) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to update this user");
        }

        // Check if the username is already in use
        User? existingUserWithSameUsername = await _userRepository.GetUserByUsername(dto.Username);

        if (existingUserWithSameUsername != null && existingUserWithSameUsername.Id != targetUserId) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.Conflict, "Username already exists");
        }

        // Get the target user
        User? targetUser = await _userRepository.GetUserById(targetUserId);

        // Ensure the target user exists
        if (targetUser == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "Target user not found");
        }

        // Update the user
        targetUser.Name = dto.Name;
        targetUser.Username = dto.Username;
        targetUser.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        if (targetUser.Role == Role.Class && targetUser.Class != null) {
            targetUser.Class.SchoolYear = dto.SchoolYear!; // Update School Year if Role is Class
        }

        if (targetUser.Role == Role.Class && targetUser.Class != null) {
            targetUser.Class.IsActive = dto.IsActive ?? targetUser.Class.IsActive; // Update isActive property if Role is Class if not null
        }

        // Update the user in the database
        await _userRepository.Update(targetUser);

        // Return the updated user based on the role
        return ServiceResult<UserDto>.Success(new UserDto {
                Id = targetUser.Id,
                Name = targetUser.Name,
                Username = targetUser.Username,
                Role = targetUser.Role,
                Class = targetUser.Role switch {
                    Role.Class => new ClassCompleteDto {
                        Id = targetUser.Class!.Id,
                        UserId = targetUser.Class.User.Id,
                        Name = targetUser.Class.User.Name,
                        Username = targetUser.Class.User.Username,
                        SchoolYear = targetUser.Class.SchoolYear,
                        IsActive = targetUser.Class.IsActive,
                        Students = targetUser.Class.Students.Select(s => new StudentSimpleDto { Id = s.Id, Name = s.Name }).ToList(),
                        Subjects = targetUser.Class.Subjects.Select(s => new SubjectSimpleDto
                            { Id = s.Id, Name = s.Name, Professor = s.Professor.User.Name }).ToList()
                    },
                    _ => null
                },
                Admin = targetUser.Role switch {
                    Role.Admin => new AdminDto {
                        Id = targetUser.Admin!.Id
                    },
                    _ => null
                },
                Professor = targetUser.Role switch {
                    Role.Professor => new ProfessorDto {
                        Id = targetUser.Professor!.Id
                    },
                    _ => null
                }
            }
        );
    }
}