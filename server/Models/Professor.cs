namespace Server.Models;

public class Professor {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public List<Subject> Subjects { get; set; }
    public Role Role { get; set; } = Role.Professor;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; } = null;
}