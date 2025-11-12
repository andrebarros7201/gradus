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

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateEvaluation([FromBody] EvaluationCreateDto dto) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<EvaluationDto> result = await _evaluationService.CreateEvaluation(int.Parse(currentUserId), dto);

        return ServiceResult<EvaluationDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpPatch("{evaluationId:int}")]
    public async Task<IActionResult> UpdateEvaluationsById([FromRoute] int evaluationId, [FromBody] EvaluationCreateDto dto) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<EvaluationDto> result = await _evaluationService.UpdateEvaluation(int.Parse(currentUserId), evaluationId, dto);

        return ServiceResult<EvaluationDto>.ReturnStatus(result);
    }

    [Authorize]
    [HttpDelete("{evaluationId:int}")]
    public async Task<IActionResult> DeleteEvaluationsById([FromRoute] int evaluationId) {
        string? currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ServiceResult<bool> result = await _evaluationService.DeleteEvaluationById(int.Parse(currentUserId), evaluationId);

        return ServiceResult<bool>.ReturnStatus(result);
    }
}