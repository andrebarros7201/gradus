using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class ProfessorRepository : IProfessorRepository {
    private readonly AppDbContext _db;

    public ProfessorRepository(AppDbContext db) {
        _db = db;
    }
    public async Task<Professor?> GetProfessorById(int id) {
        return await _db.Professors
        .Include(u => u.User)
        .Include(p => p.Subjects)
        .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<List<Professor>> GetProfessors() {
        return await _db.Professors
        .Include(p => p.User)
        .Include(p => p.Subjects)
        .ToListAsync();
    }
}