using Server.DTOs.Grade;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IGradeService {
    public Task<ServiceResult<GradeSimpleDto>> CreateGrade(int currentUserId, GradeCreateDto dto);
    public Task<ServiceResult<GradeSimpleDto>> UpdateGrade(int currentUserId, int gradeId, GradeUpdateDto dto);
    public Task<ServiceResult<bool>> DeleteGrade(int id);
}