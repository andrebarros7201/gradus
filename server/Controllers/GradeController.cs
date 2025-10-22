using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Grade;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GradeController : ControllerBase {
    private readonly IGradeService _gradeService;

    public GradeController(IGradeService gradeService) {
        _gradeService = gradeService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateGrade([FromBody] GradeCreateDto dto) {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUser = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<GradeSimpleDto> result = await _gradeService.CreateGrade(int.Parse(currentUser), dto);

        return ServiceResult<GradeSimpleDto>.ReturnStatus(result);
    }
}