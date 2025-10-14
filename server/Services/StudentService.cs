using Server.Data;
using Server.DTOs.Student;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class StudentService : IStudentService {
    private readonly IUserRepository _userRepository;

    public StudentService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public Task<ServiceResult<StudentDto>> FetchAllStudents(int classId) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<StudentDto>> FetchStudentById(int id) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<StudentDto>> FetchStudentByUsername(string username) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<bool>> CreateStudent(StudentRegisterDto dto) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<bool>> DeleteStudent(int id) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<StudentDto>> UpdateStudent() {
        throw new NotImplementedException();
    }
}