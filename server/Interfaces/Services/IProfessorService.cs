using Server.DTOs.User;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IProfessorService {
    public Task<ServiceResult<UserDto>> GetProfessorById(int id);
    public Task<ServiceResult<List<UserDto>>> GetProfessors();
}