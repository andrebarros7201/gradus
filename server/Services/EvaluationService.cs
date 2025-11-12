using Server.DTOs.Grade;
using Server.Interfaces.Repositories;
using Server.Models;
using Server.Results;

public class EvaluationService : IEvaluationService {

    private readonly IEvaluationRepository _evaluationRepository;
    private readonly IUserRepository _userRepository;
    private readonly ISubjectRepository _subjectRepository;

    public EvaluationService(IEvaluationRepository evaluationRepository, IUserRepository userRepository, ISubjectRepository subjectRepository) {
        _evaluationRepository = evaluationRepository;
        _userRepository = userRepository;
        _subjectRepository = subjectRepository;
    }


    public Task<ServiceResult<EvaluationDto>> CreateEvaluation(int currentUserId, EvaluationCreateDto dto) {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<EvaluationDto>> DeleteEvaluationById(int currentUserId, int evaluationId) {
        throw new NotImplementedException();
    }

    public async Task<ServiceResult<EvaluationDto>> GetEvaluationById(int currentUserId, int evaluationId) {
        // Get evaluation
        Evaluation? evaluation = await _evaluationRepository.GetEvaluationById(evaluationId);

        // Return 404 if null
        if (evaluation == null) {
            return ServiceResult<EvaluationDto>.Error(ServiceResultStatus.NotFound, "Evaluation Not Found");
        }

        // Find current user 
        User? currentUser = await _userRepository.GetUserById(currentUserId);

        // Return 404 if null
        if (currentUser == null) {
            return ServiceResult<EvaluationDto>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
        }

        // Find related subject
        Subject? subject = await _subjectRepository.GetSubjectById(evaluation.SubjectId);

        // Error if subject not found
        if (subject == null) {
            return ServiceResult<EvaluationDto>.Error(ServiceResultStatus.NotFound, "There was a problem");
        }

        // Check current user role
        if (currentUser.Role == Role.Class || currentUser.Role == Role.Professor) {
            // Only Admins, Subject's Professor or Subject's Class can access the evaluation
            if ((currentUser.Class!.Id != subject.Class.Id) || (currentUser.Professor!.Id != subject.ProfessorId)) {
                return ServiceResult<EvaluationDto>.Error(ServiceResultStatus.Unauthorized, "Unauthorized");
            }
        }

        return ServiceResult<EvaluationDto>.Success(new EvaluationDto {
            Id = evaluation.Id,
            Date = evaluation.Date,
            Name = evaluation.Name,
            SubjectId = evaluation.SubjectId,
            Grades = evaluation.Grades.Select(g => new GradeSimpleDto {
                Id = g.Id,
                StudentId = g.StudentId,
                StudentName = g.Student.Name,
                Value = g.Value,
            }).ToList()
        });
    }

    public Task<ServiceResult<EvaluationDto>> UpdateEvaluation(int currentUserId, int evaluationId, EvaluationCreateDto dto) {
        throw new NotImplementedException();
    }
}