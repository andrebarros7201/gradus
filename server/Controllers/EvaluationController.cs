using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Results;

[ApiController]
[Route("api/[controller]")]
public class EvaluationController : ControllerBase {
    private readonly IEvaluationService _evaluationService;

    public EvaluationController(IEvaluationService evaluationService) {
        _evaluationService = evaluationService;
    }

    [Authorize]
    [HttpGet("{evaluationId:int}")]
    public async Task<IActionResult> GetEvaluationsById([FromRoute] int evaluationId) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<EvaluationDto> result = await _evaluationService.GetEvaluationById(int.Parse(currentUserId), evaluationId);

        return ServiceResult<EvaluationDto>.ReturnStatus(result);
    }
}