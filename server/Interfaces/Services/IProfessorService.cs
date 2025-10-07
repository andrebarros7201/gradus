using Server.DTOs.Professor;
using Server.Results;

namespace Server.Interfaces.Services;

public interface IProfessorService {
    public Task<ServiceResult<bool>> Create(ProfessorRegisterDto dto, int userId);
}