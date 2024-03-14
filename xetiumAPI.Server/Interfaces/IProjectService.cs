using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Interfaces;

public interface IProjectService
{
    public Task<ProjectResponseDto> CreateProjectAsync(ProjectModelCreate modelCreate, Guid guid);
    public Task<List<ProjectDto>> GetAllProjectsAsync(Guid userId);
    public Task<bool> DeleteProjectAsync(Guid userId, Guid projectId);
}