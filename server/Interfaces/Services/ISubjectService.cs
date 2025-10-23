using Server.DTOs.Subject;
using Server.Results;

namespace Server.Interfaces.Services;

public interface ISubjectService {
    public Task<ServiceResult<SubjectCompleteDto>> GetSubjectById(int currentUserId, int subjectId);
    public Task<ServiceResult<SubjectCompleteDto>> CreateSubject(int currentUserId, SubjectCreateDto dto);
    public Task<ServiceResult<SubjectCompleteDto>> UpdateSubject(int currentUserId, int subjectId, SubjectUpdateDto dto);
    public Task<ServiceResult<bool>> DeleteSubject(int currentUserId, int subjectId);
}