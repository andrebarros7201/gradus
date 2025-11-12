using Server.Results;

public interface IEvaluationService {
    public Task<ServiceResult<EvaluationDto>> GetEvaluationById(int currentUserId, int evaluationId);
    public Task<ServiceResult<EvaluationDto>> CreateEvaluation(int currentUserId, EvaluationCreateDto dto);
    public Task<ServiceResult<EvaluationDto>> UpdateEvaluation(int currentUserId, int evaluationId, EvaluationCreateDto dto);
    public Task<ServiceResult<bool>> DeleteEvaluationById(int currentUserId, int evaluationId);
}