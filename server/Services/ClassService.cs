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

    public async Task<ServiceResult<List<ClassSimpleDto>>> GetAllClasses(int page) {
        int classCount = await _classRepository.GetClassCount();

        List<Class> classes = await _classRepository.GetAllClasses();

        // Number of pages needed
        int numberOfPages = (int)Math.Ceiling((decimal)classes.Count() / 10);

        // 10 is the number of classes per page
        IEnumerable<Class> currentPage = classes.Skip((page - 1) * 10).Take(10);

        return ServiceResult<List<ClassSimpleDto>>.Success(currentPage.Select(c => new ClassSimpleDto {
            Id = c.Id,
            UserId = c.User.Id,
            Username = c.User.Username,
            IsActive = c.IsActive,
            Name = c.User.Name,
            SchoolYear = c.SchoolYear
        }).ToList(), classCount);
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
            Username = @class.User.Username,
            IsActive = @class.IsActive,
            SchoolYear = @class.SchoolYear,
            Students = @class.Students.Select(s => new StudentSimpleDto { Id = s.Id, Name = s.Name }).ToList(),
            Subjects = @class.Subjects.Select(s => new SubjectSimpleDto { Id = s.Id, Name = s.Name, Professor = s.Professor.User.Name }).ToList()
        });
    }
}