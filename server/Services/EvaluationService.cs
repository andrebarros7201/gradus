using Server.Results;

public class EvaluationService : IEvaluationService {

    private readonly IEvaluationRepository _evaluationRepository;

    public EvaluationService(IEvaluationRepository evaluationRepository) {
        _evaluationRepository = evaluationRepository;
    }


    public Task<ServiceResult<EvaluationDto>> CreateEvaluation(int currentUserId, EvaluationCreateDto dto) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<EvaluationDto>> DeleteEvaluationById(int currentUserId, int evaluationId) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<EvaluationDto>> GetEvaluationById(int currentUserId, int evaluationId) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<List<EvaluationDto>>> GetEvaluationsByClassId(int currentUserId, int classId) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<EvaluationDto>> UpdateEvaluation(int currentUserId, int evaluationId, EvaluationCreateDto dto) {
        throw new NotImplementedException();
    }
}