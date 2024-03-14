using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Interfaces;

public interface IProjectRepository
{
    public Task CreateProjectAsync(ProjectDal userDal);

    public Task<List<ProjectDal>> GetAllUserProjectAsync(Guid id);

    public Task<ProjectDal?> GetProjectByIdAsync(Guid id);

    public Task DeleteProjectAsync(ProjectDal guid);
}