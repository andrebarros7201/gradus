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


    public async Task<Admin> GetAdminByUsername(string username) {
        return await _db.Admins.FirstOrDefaultAsync(a => a.Username == username);
    }

    public async Task<Admin> GetAdminById(int id) {
        return await _db.Admins.FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task Create(Admin admin) {
        _db.Admins.Add(admin);
        await _db.SaveChangesAsync();
    }
}