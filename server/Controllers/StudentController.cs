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
    [HttpPost]
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

        ServiceResult<StudentCompleteDto> result = await _studentService.CreateStudent(int.Parse(currentUserId), dto);

        return ServiceResult<StudentCompleteDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpGet("{studentId:int}")]
    public async Task<IActionResult> GetStudent([FromRoute] int studentId) {
        ServiceResult<StudentCompleteDto> result = await _studentService.FetchStudentById(studentId);
        return ServiceResult<StudentCompleteDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpPatch("{studentId:int}")]
    public async Task<IActionResult> UpdateStudent([FromRoute] int studentId, [FromBody] StudentUpdateDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<StudentCompleteDto> result = await _studentService.UpdateStudent(int.Parse(currentUserId), studentId, dto);

        return ServiceResult<StudentCompleteDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpDelete("{studentId:int}")]
    public async Task<IActionResult> DeleteStudent([FromRoute] int studentId) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<bool> result = await _studentService.DeleteStudent(int.Parse(currentUserId), studentId);

        return ServiceResult<bool>.ReturnStatus(result);
    }

}