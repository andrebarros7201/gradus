using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Class> Classes { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Professor> Professors { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Grade> Grades { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        // User - Admin
        modelBuilder.Entity<User>()
            .HasOne(u => u.Admin)
            .WithOne(a => a.User)
            .HasForeignKey<User>(a => a.AdminId)
            .OnDelete(DeleteBehavior.Cascade);

        // User - Professor
        modelBuilder.Entity<User>()
            .HasOne(u => u.Professor)
            .WithOne(p => p.User)
            .HasForeignKey<User>(p => p.ProfessorId)
            .OnDelete(DeleteBehavior.Cascade);

        // User - Class
        modelBuilder.Entity<User>()
            .HasOne(u => u.Class)
            .WithOne(c => c.User)
            .HasForeignKey<User>(c => c.ClassId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // Professor - Subject
        modelBuilder.Entity<Professor>()
            .HasMany(p => p.Subjects)
            .WithOne(s => s.Professor)
            .HasForeignKey(s => s.ProfessorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Class - Subject
        modelBuilder.Entity<Class>()
            .HasMany(c => c.Subjects)
            .WithMany(s => s.Classes);

        // Class - Student
        modelBuilder.Entity<Student>()
            .HasMany(s => s.Classes)
            .WithMany(c => c.Students);

        // Grade - Student
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Student)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Grade - Subject
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Subject)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.SubjectId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}