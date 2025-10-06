using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class ClassRepository : IClassRepository {
    private readonly AppDbContext _db;

    public ClassRepository(AppDbContext db) {
        _db = db;
    }

    public async Task Create(Class @class) {
        _db.Classes.Add(@class);
        await _db.SaveChangesAsync();
    }
}