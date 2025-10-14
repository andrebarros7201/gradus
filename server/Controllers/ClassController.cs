using Microsoft.AspNetCore.Mvc;
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
        ServiceResult<List<Class>> result = await _classService.GetAllClasses();

        return ServiceResult<List<Class>>.ReturnStatus(result);
    }

    [HttpGet("{classId:int}")]
    public async Task<IActionResult> GetClassById([FromRoute] int classId) {
        ServiceResult<Class?> result = await _classService.GetClassById(classId);

        return ServiceResult<Class?>.ReturnStatus(result);
    }
}