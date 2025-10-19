using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Class;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClassController : ControllerBase {
    private readonly IClassService _classService;

    public ClassController(IClassService classService) {
        _classService = classService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClasses() {
        ServiceResult<List<ClassSimpleDto>> result = await _classService.GetAllClasses();

        return ServiceResult<List<ClassSimpleDto>>.ReturnStatus(result);
    }

    [HttpGet("{classId:int}")]
    public async Task<IActionResult> GetClassById([FromRoute] int classId) {
        ServiceResult<ClassCompleteDto?> result = await _classService.GetClassById(classId);

        return ServiceResult<ClassCompleteDto?>.ReturnStatus(result);
    }
}