using Server.Models;

namespace Server.Interfaces.Repositories;

public interface IGradeRepository {
    public Task<Grade?> GetGradeById(int id);
    public Task<Grade> CreateGrade(Grade grade);
    public Task<Grade> UpdateGrade(Grade grade);
    public Task<bool> DeleteGrade(Grade grade);
}