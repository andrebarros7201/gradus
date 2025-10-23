using Server.DTOs.Subject;
using Server.Results;

namespace Server.Interfaces.Services;

public interface ISubjectService {
    public Task<ServiceResult<SubjectSimpleDto>> GetSubjectById(int currentUserId, int subjectId);
    public Task<ServiceResult<SubjectSimpleDto>> CreateSubject(int currentUserId, SubjectCreateDto dto);
    public Task<ServiceResult<SubjectSimpleDto>> UpdateSubject(int currentUserId, SubjectUpdateDto dto);
    public Task<ServiceResult<bool>> DeleteSubject(int currentUserId, int subjectId);
}