using Server.Models;

namespace Server.Interfaces.Repositories;

public interface IProfessorRepository {
    public Task<Professor?> GetProfessorById(int id);
    public Task<List<Professor>> GetProfessors();
}