using Server.DTOs.Class;
using Server.DTOs.Student;
using Server.DTOs.Subject;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
using Server.Models;
using Server.Results;

namespace Server.Services;

public class ClassService : IClassService {
    private readonly IClassRepository _classRepository;

    public ClassService(IClassRepository classRepository) {
        _classRepository = classRepository;
    }

    public async Task<ServiceResult<List<ClassSimpleDto>>> GetAllClasses() {
        List<Class> classes = await _classRepository.GetAllClasses();
        return ServiceResult<List<ClassSimpleDto>>.Success(classes.Select(c => new ClassSimpleDto {
            Id = c.Id,
            UserId = c.User.Id,
            Username = c.User.Username,
            IsActive = c.IsActive,
            Name = c.User.Name,
            SchoolYear = c.SchoolYear
        }).ToList());
    }

    public async Task<ServiceResult<ClassCompleteDto?>> GetClassById(int id) {
        Class? @class = await _classRepository.GetClassById(id);

        if (@class == null) {
            return ServiceResult<ClassCompleteDto?>.Error(ServiceResultStatus.NotFound, "Class not found");
        }

        return ServiceResult<ClassCompleteDto?>.Success(new ClassCompleteDto {
            Id = @class.Id,
            UserId = @class.User.Id,
            Name = @class.User.Name,
            IsActive = @class.IsActive,
            SchoolYear = @class.SchoolYear,
            Students = @class.Students.Select(s => new StudentSimpleDto { Id = s.Id, Name = s.Name }).ToList(),
            Subjects = @class.Subjects.Select(s => new SubjectSimpleDto { Id = s.Id, Name = s.Name, Professor = s.Professor.User.Name }).ToList()
        });
    }
}