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
                Evaluations = subject.Evaluations.Select(e => new EvaluationDto {
                    Id = e.Id,
                    Date = e.Date,
                    Name = e.Name,
                    SubjectId = e.SubjectId,
                    Grades = e.Grades.Select(g => new GradeSimpleDto {
                        Id = g.Id,
                        EvaluationName = g.Evaluation.Name,
                        EvaluationId = g.Evaluation.Id,
                        StudentId = g.StudentId,
                        StudentName = g.Student.Name,
                        Value = g.Value
                    }).ToList()
                }).ToList(),
            });
        }

        // Class
        if (currentUser.Role == Role.Class) {
            // Class does not have this subject
            if (subject.ClassId != currentUser.Class!.Id) {
                return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to access this subject");
            }

            return ServiceResult<SubjectCompleteDto>.Success(new SubjectCompleteDto {
                Id = subject.Id,
                Name = subject.Name,
                Professor = subject.Professor.User.Name,
                ProfessorId = subject.ProfessorId,
                ClassId = subject.ClassId,
                Class = subject.Class.User.Name,
                Evaluations = subject.Evaluations.Select(e => new EvaluationDto {
                    Id = e.Id,
                    Date = e.Date,
                    Name = e.Name,
                    SubjectId = e.SubjectId,
                    Grades = e.Grades.Select(g => new GradeSimpleDto {
                        Id = g.Id,
                        EvaluationName = g.Evaluation.Name,
                        EvaluationId = g.Evaluation.Id,
                        StudentId = g.StudentId,
                        StudentName = g.Student.Name,
                        Value = g.Value
                    }).ToList()
                }).ToList(),
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
                Evaluations = subject.Evaluations.Select(e => new EvaluationDto {
                    Id = e.Id,
                    Date = e.Date,
                    Name = e.Name,
                    SubjectId = e.SubjectId,
                    Grades = e.Grades.Select(g => new GradeSimpleDto {
                        Id = g.Id,
                        EvaluationName = g.Evaluation.Name,
                        EvaluationId = g.Evaluation.Id,
                        StudentId = g.StudentId,
                        StudentName = g.Student.Name,
                        Value = g.Value
                    }).ToList()
                }).ToList(),
            });
        }

        return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.BadRequest, "Invalid role");
    }

    public async Task<ServiceResult<SubjectCompleteDto>> CreateSubject(int currentUserId, SubjectCreateDto dto) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (currentUser.Role != Role.Admin) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create a subject");
        }

        User? professor = await _userRepository.GetUserById(dto.ProfessorId);

        if (professor == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "Professor not found");
        }

        User? @class = await _userRepository.GetUserById(dto.ClassId);

        if (@class == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "Class not found");
        }

        var newSubject = new Subject {
            Name = dto.Name,
            ProfessorId = dto.ProfessorId,
            ClassId = dto.ClassId
        };

        await _subjectRepository.CreateSubject(newSubject);

        return ServiceResult<SubjectCompleteDto>.Success(new SubjectCompleteDto {
            Id = newSubject.Id,
            Name = newSubject.Name,
            Professor = newSubject.Professor.User.Name,
            ProfessorId = newSubject.ProfessorId,
            ClassId = newSubject.ClassId,
            Class = newSubject.Class.User.Name
        });
    }

    public async Task<ServiceResult<SubjectCompleteDto>> UpdateSubject(int currentUserId, int subjectId, SubjectUpdateDto dto) {
        User? user = await _userRepository.GetUserById(currentUserId);

        if (user == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (user.Role != Role.Admin) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to update this subject");
        }

        Subject? subject = await _subjectRepository.GetSubjectById(subjectId);

        if (subject == null) {
            return ServiceResult<SubjectCompleteDto>.Error(ServiceResultStatus.NotFound, "Subject not found");
        }

        subject.Name = dto.Name;
        subject.ProfessorId = dto.ProfessorId;

        await _subjectRepository.UpdateSubject(subject);

        return ServiceResult<SubjectCompleteDto>.Success(new SubjectCompleteDto {
            Id = subject.Id,
            Name = subject.Name,
            Professor = subject.Professor.User.Name,
            ProfessorId = subject.ProfessorId,
            ClassId = subject.ClassId,
            Class = subject.Class.User.Name
        });
    }

    public async Task<ServiceResult<bool>> DeleteSubject(int currentUserId, int subjectId) {
        User? user = await _userRepository.GetUserById(currentUserId);

        if (user == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (user.Role != Role.Admin) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to update this subject");
        }

        Subject? subject = await _subjectRepository.GetSubjectById(subjectId);

        if (subject == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Subject not found");
        }

        await _subjectRepository.DeleteSubject(subject);

        return ServiceResult<bool>.Success(true);
    }
}