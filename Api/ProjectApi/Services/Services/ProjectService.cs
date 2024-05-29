using Domain.Entity;
using Domain.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class ProjectService: IProjectService
{
    private IProjectStore _projectStore;
    private IStandartStore _standartStore;
    public ProjectService(IProjectStore projectStore, IStandartStore standartStore)
    {
        _projectStore = projectStore;
        _standartStore = standartStore;
    }
    public async Task<Guid> CreateAsync(Project project)
    {
        var res = await _standartStore.CreateAsync(project);
        
        return res;
    }

    public async Task<List<Project>> GetAllAsync(Guid userId)
    {
        var res = await _projectStore.GetAllAsync(userId);
        
        return res;
    }

    public  async Task DeleteAsync(Guid userId, Guid projectId)
    {
        var project = await _standartStore.GetByIdAsync<Project>(projectId);
        
        if (project is null ||
            project.UserId != userId)
        {
            throw new Exception("User not owner or project doesn't exist");
        }
        
        await _standartStore.DeleteAsync(project);
    }
}