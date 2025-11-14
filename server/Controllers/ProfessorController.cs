using Microsoft.AspNetCore.Mvc;
using Server.DTOs.User;
using Server.Interfaces.Services;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfessorController : ControllerBase {
    private readonly IProfessorService _professorService;

    public ProfessorController(IProfessorService professorService) {
        _professorService = professorService;
    }

    [HttpGet]
    public async Task<IActionResult> FetchProfessors() {
        ServiceResult<List<UserDto>> result = await _professorService.GetProfessors();

        return ServiceResult<List<UserDto>>.ReturnStatus(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> FetchProfessorById([FromRoute] int id) {
        ServiceResult<UserDto> result = await _professorService.GetProfessorById(id);

        return ServiceResult<UserDto>.ReturnStatus(result);
    }
}