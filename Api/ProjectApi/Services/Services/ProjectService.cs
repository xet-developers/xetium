using Domain.Entity;
using Services.Interfaces;

namespace Services.Services;

public class ProjectService: IProjectService
{
    public Task<Guid> CreateAsync(Project project)
    {
        throw new NotImplementedException();
    }

    public Task<List<Project>> GetAllAsync(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(Guid userId, Guid projectId)
    {
        throw new NotImplementedException();
    }
}