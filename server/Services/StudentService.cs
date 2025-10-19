using Server.Data;
using Server.DTOs.Student;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class StudentService : IStudentService
{
    private readonly IUserRepository _userRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly IClassRepository _classRepository;

    public StudentService(IUserRepository userRepository, IStudentRepository studentRepository, IClassRepository classRepository)
    {
        _userRepository = userRepository;
        _studentRepository = studentRepository;
        _classRepository = classRepository;
    }

    public Task<ServiceResult<StudentCompleteDto>> FetchAllStudents(int classId)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<StudentCompleteDto>> FetchStudentById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<StudentCompleteDto>> FetchStudentByUsername(string username)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResult<bool>> CreateStudent(int currentUserId, StudentRegisterDto dto)
    {
        // Fetch current user
        var currentUser = await _userRepository.GetUserById(currentUserId);

        // Check if the current user exists
        if (currentUser == null)
        {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        // Only admins can create students
        // Check if the current user is an admin
        if (currentUser.Role != Role.Admin)
        {
            return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create this student");
        }

        var @class = await _classRepository.GetClassById(dto.ClassId);

        if (@class == null)
        {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Class not found");
        }

        // Create the new student
        var newStudent = new Student
        {
            Name = dto.Name,
            Classes = [@class] // Initialize with the class the student is enrolled in
        };

        await _studentRepository.CreateStudent(newStudent);

        return ServiceResult<bool>.Success(true);
    }

    public Task<ServiceResult<bool>> DeleteStudent(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<StudentCompleteDto>> UpdateStudent()
    {
        throw new NotImplementedException();
    }
}
