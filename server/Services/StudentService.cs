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

    public async Task<ServiceResult<List<StudentSimpleDto>>> GetAllStudents(int page) {
        int studentCount = await _studentRepository.GetAllStudentsCount();

        IEnumerable<Student> students = await _studentRepository.GetAllStudents();

        // 10 is the number of students per page
        IEnumerable<Student> currentPage = students.Skip((page - 1) * 10).Take(10);

        return ServiceResult<List<StudentSimpleDto>>.Success(currentPage.Select(s => new StudentSimpleDto {
            Id = s.Id,
            Name = s.Name,
            ClassName = s.Classes.Where(c => c.IsActive).Select(c => c.User.Name).FirstOrDefault()!
        }).ToList());
    }


    public async Task<ServiceResult<StudentCompleteDto>> FetchStudentById(int id) {
        Student? student = await _studentRepository.GetStudentById(id);

        if (student == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.NotFound, "Student not found");
        }

        return ServiceResult<StudentCompleteDto>.Success(new StudentCompleteDto {
            Id = student.Id,
            Name = student.Name,
            Class = student.Classes.Where(c => c.IsActive).Select(c => new ClassSimpleDto {
                Id = c.Id,
                UserId = c.User.Id,
                Name = c.User.Name,
                Username = c.User.Username,
                IsActive = c.IsActive,
                SchoolYear = c.SchoolYear
            }).FirstOrDefault()!,
            Grades = student.Grades.Select(g => new GradeSimpleDto {
                Id = g.Id,
                EvaluationName = g.Evaluation.Name,
                EvaluationId = g.Evaluation.Id,
                SubjectName = g.Evaluation.Subject.Name,
                SubjectId = g.Evaluation.Subject.Id,
                Value = g.Value
            }).ToList()
        });
    }

    public async Task<ServiceResult<StudentCompleteDto>> CreateStudent(int currentUserId, StudentRegisterDto dto) {
        // Fetch current user
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        // Check if the current user exists
        if (currentUser == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.NotFound, "Current user not found");
        }

        // Only admins can create students
        // Check if the current user is an admin
        if (currentUser.Role != Role.Admin) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create this student");
        }

        Class? @class = await _classRepository.GetClassById(dto.ClassId);

        if (@class == null) {
            return ServiceResult<StudentCompleteDto>.Error(ServiceResultStatus.NotFound, "Class not found");
        }

        // Create the new student
        var newStudent = new Student {
            Name = dto.Name,
            Classes = [@class] // Initialize with the class the student is enrolled in
        };

        Student createdStudent = await _studentRepository.CreateStudent(newStudent);

        return ServiceResult<StudentCompleteDto>.Success(new StudentCompleteDto {
            Id = createdStudent.Id,
            Class = createdStudent.Classes.Where(c => c.IsActive).Select(c => new ClassSimpleDto {
                Id = c.Id,
                UserId = c.User.Id,
                Username = c.User.Username,
                IsActive = c.IsActive,
                Name = c.User.Name,
                SchoolYear = c.SchoolYear
            }).FirstOrDefault()!,
            Name = createdStudent.Name,
            Grades = createdStudent.Grades.Select(g => new GradeSimpleDto {
                Id = g.Id,
                EvaluationName = g.Evaluation.Name,
                EvaluationId = g.Evaluation.Id,
                SubjectName = g.Evaluation.Subject.Name,
                SubjectId = g.Evaluation.Subject.Id,
                Value = g.Value
            }).ToList()
        });
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
            Class = targetStudent.Classes.Where(c => c.IsActive).Select(c => new ClassSimpleDto {
                Id = c.Id,
                UserId = c.User.Id,
                Username = c.User.Username,
                Name = c.User.Name,
                IsActive = c.IsActive,
                SchoolYear = c.SchoolYear
            }).FirstOrDefault()!,
            Grades = targetStudent.Grades.Select(g => new GradeSimpleDto {
                Id = g.Id,
                EvaluationName = g.Evaluation.Name,
                EvaluationId = g.Evaluation.Id,
                SubjectName = g.Evaluation.Subject.Name,
                SubjectId = g.Evaluation.Subject.Id,
                Value = g.Value
            }).ToList()
        });
    }
}