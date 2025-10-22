using Server.DTOs.Student;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IStudentService {
    public Task<ServiceResult<StudentCompleteDto>> FetchStudentById(int id);
    public Task<ServiceResult<bool>> CreateStudent(int currentUserId, StudentRegisterDto dto);
    public Task<ServiceResult<StudentCompleteDto>> UpdateStudent(int currentUserId, int studentId, StudentUpdateDto dto);
    public Task<ServiceResult<bool>> DeleteStudent(int currentUserId, int studentId);
}