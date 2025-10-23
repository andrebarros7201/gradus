using Server.Models;

namespace Server.Interfaces.Repositories;

public interface ISubjectRepository {
    public Task<Subject?> GetSubjectById(int id);
    public Task<Subject> CreateSubject(Subject subject);
    public Task<Subject> UpdateSubject(Subject subject);
    public Task<bool> DeleteSubject(Subject subject);
}