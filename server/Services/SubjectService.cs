using Server.DTOs.Grade;
using Server.DTOs.Subject;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class SubjectService : ISubjectService {
    private readonly ISubjectRepository _subjectRepository;
    private readonly IUserRepository _userRepository;

    public SubjectService(ISubjectRepository subjectRepository, IUserRepository userRepository) {
        _subjectRepository = subjectRepository;
        _userRepository = userRepository;
    }

    public async Task<ServiceResult<SubjectCompleteDto>> GetSubjectById(int currentUserId, int subjectId) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        Subject? subject = await _subjectRepository.GetSubjectById(subjectId);

        if (subject == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "Subject not found");
        }

        // Admin can see all subjects
        if (currentUser.Role == Role.Admin) {
            return ServiceResult<SubjectCompleteDto>.Success(new SubjectCompleteDto {
                Id = subject.Id,
                Name = subject.Name,
                Professor = subject.Professor.User.Name,
                ProfessorId = subject.ProfessorId,
                ClassId = subject.ClassId,
                Class = subject.Class.User.Name,
                Grades = subject.Grades.Select(g => new GradeSimpleDto {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.Name,
                    Value = g.Value
                }).ToList()
            });
        }

        // Class
        if (currentUser.Role == Role.Class) {
            // Class does not have this subject
            if (subject.ClassId != currentUser.ClassId) {
                return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to access this subject");
            }

            return ServiceResult<SubjectCompleteDto>.Success(new SubjectCompleteDto {
                Id = subject.Id,
                Name = subject.Name,
                Professor = subject.Professor.User.Name,
                ProfessorId = subject.ProfessorId,
                ClassId = subject.ClassId,
                Class = subject.Class.User.Name,
                Grades = subject.Grades.Select(g => new GradeSimpleDto {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.Name,
                    Value = g.Value
                }).ToList()
            });
        }

        // Professor
        if (currentUser.Role == Role.Professor) {
            // Professor does not have this subject
            if (subject.ProfessorId != currentUser.Id) {
                return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to access this subject");
            }

            return ServiceResult<SubjectCompleteDto>.Success(new SubjectCompleteDto {
                Id = subject.Id,
                Name = subject.Name,
                Professor = subject.Professor.User.Name,
                ProfessorId = subject.ProfessorId,
                ClassId = subject.ClassId,
                Class = subject.Class.User.Name,
                Grades = subject.Grades.Select(g => new GradeSimpleDto {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.Name,
                    Value = g.Value
                }).ToList()
            });
        }

        return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.BadRequest, "Invalid role");
    }

    public Task<ServiceResult<SubjectCompleteDto>> CreateSubject(int currentUserId, SubjectCreateDto dto) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<SubjectCompleteDto>> UpdateSubject(int currentUserId, SubjectUpdateDto dto) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<bool>> DeleteSubject(int currentUserId, int subjectId) {
        throw new NotImplementedException();
    }
}