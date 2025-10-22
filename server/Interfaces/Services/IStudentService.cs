using Server.DTOs.Student;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IStudentService {
    public Task<ServiceResult<StudentCompleteDto>> FetchAllStudents(int classId);
    public Task<ServiceResult<StudentCompleteDto>> FetchStudentById(int id);
    public Task<ServiceResult<StudentCompleteDto>> FetchStudentByUsername(string username);
    public Task<ServiceResult<bool>> CreateStudent(int currentUserId, StudentRegisterDto dto);

    public Task<ServiceResult<bool>> DeleteStudent(int currentUserId, int studentId);

    // TODO add update student args
    public Task<ServiceResult<StudentCompleteDto>> UpdateStudent();
}