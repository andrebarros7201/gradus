using System.Diagnostics.Metrics;
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
            .Include(c => c.Subjects).ThenInclude(s => s.Professor).ThenInclude(p => p.User)
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<(List<Class>, int classCount)> GetAllClasses(int page) {
        IQueryable<Class> query = _db.Classes.AsQueryable();

        int classCount = await query.CountAsync();

        List<Class> classList = await query.Skip((page - 1) * 10).Take(10).ToListAsync();

        return (classList, classCount);
    }
}