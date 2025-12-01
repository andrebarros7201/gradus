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
    public DbSet<Evaluation> Evaluations { get; set; }
    public DbSet<Grade> Grades { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        // User - Admin
        modelBuilder.Entity<Admin>()
            .HasOne(a => a.User)
            .WithOne(u => u.Admin)
            .HasForeignKey<Admin>(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User - Professor
        modelBuilder.Entity<Professor>()
            .HasOne(p => p.User)
            .WithOne(u => u.Professor)
            .HasForeignKey<Professor>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User - Class
        modelBuilder.Entity<Class>()
            .HasOne(c => c.User)
            .WithOne(u => u.Class)
            .HasForeignKey<Class>(c => c.UserId)
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
            .WithOne(s => s.Class)
            .OnDelete(DeleteBehavior.Cascade);

        // Class - Student
        modelBuilder.Entity<Student>()
            .HasMany(s => s.Classes)
            .WithMany(c => c.Students);

        // Grade - Student
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Student)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Ensures Unique combination between Evaluation and Student
        modelBuilder.Entity<Grade>()
        .HasIndex(g => new { g.EvaluationId, g.StudentId })
        .IsUnique();

        // Grade - Subject
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Evaluation)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.EvaluationId)
            .OnDelete(DeleteBehavior.Cascade);

        // Evaluation - Subject
        modelBuilder.Entity<Evaluation>()
            .HasOne(g => g.Subject)
            .WithMany(s => s.Evaluations)
            .HasForeignKey(g => g.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Seed

        // Admin
        modelBuilder.Entity<Admin>().HasData(
            new Admin {
                Id = 1,
                UserId = 1
            }
        );

        modelBuilder.Entity<User>().HasData(
            new User {
                Id = 1,
                Name = "Admin",
                Username = "admin",
                Password = "$2a$11$8MiuxgN5KWdwBZ5F9SKc1OfnoozFj4nFfu0taWBByRvGTHE.ZzHdG",
                Role = Role.Admin,
                CreatedAt = new DateTime(2025, 10, 15, 11, 47, 40, 964, DateTimeKind.Utc)
            });

        // Professor
        modelBuilder.Entity<Professor>().HasData(
            new Professor {
                Id = 1,
                UserId = 2
            }
        );

        modelBuilder.Entity<User>().HasData(
            new User {
                Id = 2,
                Name = "Professor",
                Username = "professor",
                Password = "$2a$11$8MiuxgN5KWdwBZ5F9SKc1OfnoozFj4nFfu0taWBByRvGTHE.ZzHdG",
                Role = Role.Professor,
                CreatedAt = new DateTime(2025, 10, 15, 11, 47, 40, 964, DateTimeKind.Utc)
            });

        // Class
        for (int i = 1; i <= 100; i++) {
            modelBuilder.Entity<Class>().HasData(
                new Class {
                    Id = i,
                    UserId = i + 2,
                    SchoolYear = "2025/26"
                }
            );

            modelBuilder.Entity<User>().HasData(
                new User {
                    Id = i + 2,
                    Name = $"Class{i}",
                    Username = $"class{i}",
                    Password = "$2a$11$8MiuxgN5KWdwBZ5F9SKc1OfnoozFj4nFfu0taWBByRvGTHE.ZzHdG",
                    Role = Role.Class,
                    CreatedAt = new DateTime(2025, 10, 15, 11, 47, 40, 964, DateTimeKind.Local).AddTicks(2206)
                });

        }

        // Students and Subjects
        // Iterate over all created classes
        for (int i = 1; i <= 100; i++) {

            // Create 10 students per class
            for (int k = 1; k <= 10; k++) {

                int studentId = (i - 1) * 10 + k;

                modelBuilder.Entity<Student>().HasData(
                    new Student { Id = studentId, Name = $"Student{studentId}" }
                );

                // Link Student and Class
                modelBuilder.Entity("ClassStudent").HasData(
                    new { StudentsId = studentId, ClassesId = i }
                );
            }

            // Subject List
            List<string> subjects = ["Math", "English", "History", "Computer Science"];

            for (int k = 1; k <= subjects.Count; k++) {

                int subjectId = i * subjects.Count + k;

                // Subjects
                modelBuilder.Entity<Subject>().HasData(
                    new Subject {
                        Id = subjectId,
                        Name = subjects[k - 1], // 0 indexed
                        ProfessorId = 1,
                        ClassId = i
                    });

                // Evaluation
                modelBuilder.Entity<Evaluation>().HasData(
                    new Evaluation {
                        Id = subjectId,
                        Name = "Exam",
                        Date = new DateOnly(2025, 02, 02),
                        EvaluationType = EvaluationType.Exam,
                        SubjectId = subjectId
                    }
                );
            }
        }
    }
}