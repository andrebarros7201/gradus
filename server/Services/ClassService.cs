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

    public async Task<ServiceResult<List<Class>>> GetAllClasses() {
        List<Class> classes = await _classRepository.GetAllClasses();
        return ServiceResult<List<Class>>.Success(classes);
    }

    public async Task<ServiceResult<Class?>> GetClassById(int id) {
        var @class = await _classRepository.GetClassById(id);
        return ServiceResult<Class?>.Success(@class);
    }
}