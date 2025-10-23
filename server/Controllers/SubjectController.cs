using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Subject;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubjectController : ControllerBase {
    private readonly ISubjectService _subjectService;

    public SubjectController(ISubjectService subjectService) {
        _subjectService = subjectService;
    }

    [Authorize]
    [HttpGet("{subjectId:int}")]
    public async Task<IActionResult> GetSubjectById([FromRoute] int subjectId) {
        string? currentUser = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<SubjectCompleteDto> result = await _subjectService.GetSubjectById(int.Parse(currentUser), subjectId);

        return ServiceResult<SubjectCompleteDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateSubject([FromBody] SubjectCreateDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<SubjectCompleteDto> result = await _subjectService.CreateSubject(int.Parse(currentUserId), dto);

        return ServiceResult<SubjectCompleteDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpPatch("{subjectId:int}")]
    public async Task<IActionResult> UpdateSubject([FromRoute] int subjectId, SubjectUpdateDto dto) {
        // Validate Model
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<SubjectCompleteDto> result = await _subjectService.UpdateSubject(int.Parse(currentUserId), subjectId, dto);

        return ServiceResult<SubjectCompleteDto>.ReturnStatus(result);
    }


    [Authorize]
    [HttpDelete("{subjectId:int}")]
    public async Task<IActionResult> DeleteSubject([FromRoute] int subjectId) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<bool> result = await _subjectService.DeleteSubject(int.Parse(currentUserId), subjectId);

        return ServiceResult<bool>.ReturnStatus(result);
    }
    
}