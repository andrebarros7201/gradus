namespace Server.Models;

public class Professor {
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public List<Subject> Subjects { get; set; }
}