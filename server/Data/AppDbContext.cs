using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class AppDbContext : DbContext {

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Class> Classes { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Professor> Professors { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Grade> Grades { get; set; }
    public DbSet<ClassSubject> ClassSubjects { get; set; }
    public DbSet<ClassStudents> ClassStudents { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        // Professor - Subject
        modelBuilder.Entity<Professor>()
            .HasMany(p => p.Subjects)
            .WithOne(s => s.Professor)
            .HasForeignKey(s => s.ProfessorId)
            .OnDelete(DeleteBehavior.Cascade);

        // Class - Subject
        modelBuilder.Entity<ClassSubject>()
            .HasKey(cs => new { cs.ClassId, cs.SubjectId });

        modelBuilder.Entity<ClassSubject>()
            .HasOne(cs => cs.Class)
            .WithMany(c => c.Subjects)
            .HasForeignKey(cs => cs.ClassId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ClassSubject>()
            .HasOne(cs => cs.Subject)
            .WithMany(s => s.Classes)
            .HasForeignKey(cs => cs.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Class - Student
        modelBuilder.Entity<ClassStudents>()
            .HasKey(cs => new { cs.ClassId, cs.StudentId });

        modelBuilder.Entity<ClassStudents>()
            .HasOne(cs => cs.Class)
            .WithMany(c => c.Students)
            .HasForeignKey(cs => cs.ClassId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ClassStudents>()
            .HasOne(cs => cs.Student)
            .WithMany(s => s.Classes)
            .HasForeignKey(cs => cs.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Grade - Student
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Student)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Grade - Subject
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Subject)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }


}