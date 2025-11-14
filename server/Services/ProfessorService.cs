using Server.DTOs.Professor;
using Server.DTOs.Subject;
using Server.DTOs.User;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class ProfessorService : IProfessorService {
    private readonly IProfessorRepository _professorRepository;

    public ProfessorService(IProfessorRepository professorRepository) {
        _professorRepository = professorRepository;
    }
    public async Task<ServiceResult<UserDto>> GetProfessorById(int id) {
        Professor? professor = await _professorRepository.GetProfessorById(id);

        if (professor == null) {
            return ServiceResult<UserDto>.Error(ServiceResultStatus.NotFound, "Professor not found");
        }

        return ServiceResult<UserDto>.Success(new UserDto {
            Id = professor.User.Id,
            Name = professor.User.Name,
            Role = professor.User.Role,
            Username = professor.User.Username,
            Professor = new ProfessorDto {
                Id = professor.Id,
                Subjects = professor.Subjects.Select(s => new SubjectSimpleDto {
                    Id = s.Id,
                    Name = s.Name
                }).ToList()
            }
        });
    }

    public async Task<ServiceResult<List<UserDto>>> GetProfessors() {
        List<Professor> professorList = await _professorRepository.GetProfessors();

        return ServiceResult<List<UserDto>>.Success(professorList.Select(p => new UserDto {
            Id = p.User.Id,
            Name = p.User.Name,
            Role = p.User.Role,
            Username = p.User.Username,
            Professor = new ProfessorDto {
                Id = p.Id,
                Subjects = p.Subjects.Select(s => new SubjectSimpleDto {
                    Id = s.Id,
                    Name = s.Name
                }).ToList()
            }
        }).ToList());
    }
}