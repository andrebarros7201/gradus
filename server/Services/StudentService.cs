using Server.Data;
using Server.DTOs.Class;
using Server.DTOs.Grade;
using Server.DTOs.Student;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class StudentService : IStudentService {
    private readonly IUserRepository _userRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly IClassRepository _classRepository;

    public StudentService(IUserRepository userRepository, IStudentRepository studentRepository, IClassRepository classRepository) {
        _userRepository = userRepository;
        _studentRepository = studentRepository;
        _classRepository = classRepository;
    }

    public async Task<ServiceResult<StudentCompleteDto>> FetchStudentById(int id) {
        if (id == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.BadRequest, "Invalid student id");
        }

        Student student = await _studentRepository.GetStudentById(id);

        if (student == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.NotFound, "Student not found");
        }

        return ServiceResult<StudentCompleteDto>.Success(new StudentCompleteDto {
            Id = student.Id,
            Name = student.Name,
            Class = student.Classes.Where(c => c.IsActive == true).Select(c => new ClassSimpleDto {
                Id = c.Id,
                Name = c.User.Name,
                IsActive = c.IsActive,
                SchoolYear = c.SchoolYear
            }).FirstOrDefault(),
            Grades = student.Grades.Select(g => new GradeSimpleDto {
                Id = g.Id,
                SubjectName = g.Subject.Name,
                Value = g.Value
            }).ToList()
        });
    }

    public async Task<ServiceResult<bool>> CreateStudent(int currentUserId, StudentRegisterDto dto) {
        // Fetch current user
        var currentUser = await _userRepository.GetUserById(currentUserId);

        // Check if the current user exists
        if (currentUser == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        // Only admins can create students
        // Check if the current user is an admin
        if (currentUser.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create this student");
        }

        var @class = await _classRepository.GetClassById(dto.ClassId);

        if (@class == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Class not found");
        }

        // Create the new student
        var newStudent = new Student {
            Name = dto.Name,
            Classes = [@class] // Initialize with the class the student is enrolled in
        };

        await _studentRepository.CreateStudent(newStudent);

        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<bool>> DeleteStudent(int currentUserId, int studentId) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        Student? student = await _studentRepository.GetStudentById(studentId);

        if (student == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Student not found");
        }

        if (currentUser.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to delete this student");
        }

        await _studentRepository.DeleteStudent(student);

        return ServiceResult<bool>.Success(true);
        
    }

    public async Task<ServiceResult<StudentCompleteDto>> UpdateStudent(int currentUserId, int studentId, StudentUpdateDto dto) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        if (currentUser.Role != Role.Admin) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.Forbidden, "Current user is not authorized to perform this action");
        }

        Student? targetStudent = await _studentRepository.GetStudentById(studentId);

        if (targetStudent == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.NotFound, "Student not found");
        }

        targetStudent.Name = dto.Name;

        await _studentRepository.UpdateStudent(targetStudent);

        return ServiceResult<StudentCompleteDto>.Success(new StudentCompleteDto {
            Id = targetStudent.Id,
            Name = targetStudent.Name,
            Class = targetStudent.Classes.Where(c => c.IsActive == true).Select(c => new ClassSimpleDto {
                Id = c.Id,
                Name = c.User.Name,
                IsActive = c.IsActive,
                SchoolYear = c.SchoolYear
            }).FirstOrDefault(),
            Grades = targetStudent.Grades.Select(g => new GradeSimpleDto {
                Id = g.Id,
                SubjectName = g.Subject.Name,
                Value = g.Value
            }).ToList()
        });
    }
}