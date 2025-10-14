using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class ClassRepository : IClassRepository {
    private readonly AppDbContext _db;

    public ClassRepository(AppDbContext db) {
        _db = db;
    }

    public async Task<Class?> GetClassById(int id) {
        return await _db.Classes
            .Include(c => c.Students)
            .Include(c => c.Subjects)
            .Include(c => c.User).ThenInclude(u => u.Name)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<List<Class>> GetAllClasses() {
        return await _db.Classes
            .Include(c => c.Students)
            .Include(c => c.Subjects)
            .Include(c => c.User).ThenInclude(u => u.Name)
            .ToListAsync();
    }
}