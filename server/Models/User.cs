namespace Server.Models;

public class User {
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }

    public int? ClassId { get; set; }
    public Class? Class { get; set; }

    public int? ProfessorId { get; set; }
    public Professor? Professor { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}