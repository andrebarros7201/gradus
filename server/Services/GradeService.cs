using Server.DTOs.Grade;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class GradeService : IGradeService {
    private readonly IGradeRepository _gradeRepository;
    private readonly IUserRepository _userRepository;

    public GradeService(IGradeRepository gradeRepository, IUserRepository userRepository) {
        _gradeRepository = gradeRepository;
        _userRepository = userRepository;
    }

    public async Task<ServiceResult<GradeSimpleDto>> CreateGrade(int currentUserId, GradeCreateDto dto) {
        User? user = await _userRepository.GetUserById(currentUserId);

        if (user == null) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (user.Role == Role.Class) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create a grade");
        }

        var newGrade = new Grade {
            Value = dto.Value,
            StudentId = dto.StudentId,
            EvaluationId = dto.EvaluationId
        };

        Grade createdGrade = await _gradeRepository.CreateGrade(newGrade);

        return ServiceResult<GradeSimpleDto>.Success(new GradeSimpleDto {
            Id = createdGrade.Id,
            Value = createdGrade.Value,
            StudentId = createdGrade.StudentId,
            StudentName = createdGrade.Student.Name,
            EvaluationName = createdGrade.Evaluation.Name,
            SubjectName = createdGrade.Evaluation.Subject.Name
        });
    }

    public async Task<ServiceResult<GradeSimpleDto>> UpdateGrade(int currentUserId, int gradeId, GradeUpdateDto dto) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (currentUser.Role == Role.Class) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to update a grade");
        }

        Grade? grade = await _gradeRepository.GetGradeById(gradeId);

        if (grade == null) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.NotFound, "Grade not found");
        }

        grade.Value = dto.Value;

        await _gradeRepository.UpdateGrade(grade);

        return ServiceResult<GradeSimpleDto>.Success(new GradeSimpleDto {
            Id = grade.Id,
            Value = grade.Value,
            StudentId = grade.StudentId,
            StudentName = grade.Student.Name,
            EvaluationName = grade.Evaluation.Name,
            SubjectName = grade.Evaluation.Subject.Name
        });
    }

    public async Task<ServiceResult<bool>> DeleteGrade(int currentUserId, int gradeId) {
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        if (currentUser == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (currentUser.Role == Role.Class) {
            return ServiceResult<bool>.Error(ServiceResultStatus.Forbidden, "You are not authorized to update a grade");
        }

        Grade? grade = await _gradeRepository.GetGradeById(gradeId);

        if (grade == null) {
            return ServiceResult<bool>.Error(ServiceResultStatus.NotFound, "Grade not found");
        }

        await _gradeRepository.DeleteGrade(grade);

        return ServiceResult<bool>.Success(true);
    }
}