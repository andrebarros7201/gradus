namespace Server.Models;

public class User {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public Role Role { get; set; }

    public Professor? Professor { get; set; }
    public int? ProfessorId { get; set; }

    public Admin? Admin { get; set; }
    public int? AdminId { get; set; }

    public Class? Class { get; set; }
    public int? ClassId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; } = null;
}