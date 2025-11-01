namespace Server.Models;

public class Professor {
    public int Id { get; set; }
    public List<Subject> Subjects { get; set; } = [];

    public User User { get; set; }
    public int UserId { get; set; }
}