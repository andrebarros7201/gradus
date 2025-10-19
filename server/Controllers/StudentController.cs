using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Student;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase {
    private readonly IStudentService _studentService;

    public StudentController(IStudentService studentService) {
        _studentService = studentService;
    }

    [Authorize]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterStudent([FromBody] StudentRegisterDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Ensure the userId is not null
        if (currentUserId == null) {
            return new ObjectResult("Forbidden") { StatusCode = 403 };
        }

        ServiceResult<bool> result = await _studentService.CreateStudent(int.Parse(currentUserId), dto);

        return ServiceResult<bool>.ReturnStatus(result);
    }
}