using Server.DTOs.Student;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IStudentService {
    public Task<ServiceResult<StudentDto>> FetchAllStudents(int classId);
    public Task<ServiceResult<StudentDto>> FetchStudentById(int id);
    public Task<ServiceResult<StudentDto>> FetchStudentByUsername(string username);
    public Task<ServiceResult<bool>> CreateStudent(StudentRegisterDto dto);

    public Task<ServiceResult<bool>> DeleteStudent(int id);

    // TODO add update student args
    public Task<ServiceResult<StudentDto>> UpdateStudent();
}