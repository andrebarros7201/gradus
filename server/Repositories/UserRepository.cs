using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Models;

namespace Server.Repositories;

public class UserRepository : IUserRepository {
    private readonly AppDbContext _db;

    public UserRepository(AppDbContext db) {
        _db = db;
    }

    public async Task<User?> GetUserById(int id) {
        return await _db.Users
            .Include(u => u.Admin)
            .Include(u => u.Professor).ThenInclude(p => p.Subjects)
            .Include(u => u.Class)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User?> GetUserByUsername(string username) {
        return await _db.Users
            .Include(u => u.Admin)
            .Include(u => u.Professor).ThenInclude(p => p.Subjects)
            .Include(u => u.Class)
            .FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task Create(User user) {
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
    }

    public async Task Delete(User user) {
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
    }

    public async Task Update(User user) {
        _db.Users.Update(user);
        await _db.SaveChangesAsync();
    }
}