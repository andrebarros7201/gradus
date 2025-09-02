using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class AdminRepository : IAdminRepository {
    private readonly AppDbContext _db;

    public AdminRepository(AppDbContext db) {
        _db = db;
    }

    public async Task Create(Admin admin) {
        _db.Admins.Add(admin);
        await _db.SaveChangesAsync();
    }
}