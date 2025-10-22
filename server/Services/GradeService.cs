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
        User user = await _userRepository.GetUserById(currentUserId);

        if (user == null) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.NotFound, "User not found");
        }

        if (user.Role == Role.Class) {
            return ServiceResult<GradeSimpleDto>.Error(ServiceResultStatus.Forbidden, "You are not authorized to create a grade");
        }

        var newGrade = new Grade {
            Value = dto.Value,
            StudentId = dto.StudentId,
            SubjectId = dto.SubjectId
        };

        Grade createdGrade = await _gradeRepository.CreateGrade(newGrade);

        return ServiceResult<GradeSimpleDto>.Success(new GradeSimpleDto {
            Id = createdGrade.Id,
            Value = createdGrade.Value,
            StudentId = createdGrade.StudentId,
            StudentName = createdGrade.Student.Name,
            SubjectName = createdGrade.Subject.Name
        });
    }

    public Task<ServiceResult<GradeSimpleDto>> UpdateGrade(int currentUserId, int gradeId, GradeUpdateDto dto) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<bool>> DeleteGrade(int id) {
        throw new NotImplementedException();
    }
}