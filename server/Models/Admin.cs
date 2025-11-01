namespace Server.Models;

public class Admin {
    public int Id { get; set; }

    public User User { get; set; } = null!;
    public int UserId { get; set; }
}