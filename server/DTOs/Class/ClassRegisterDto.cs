using System.ComponentModel.DataAnnotations;

namespace Server.DTOs.Class;

public class ClassRegisterDto {
    [Required] public string SchoolYear { get; set; } = string.Empty;
}