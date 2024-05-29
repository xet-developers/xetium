using Domain.Entity;

namespace Services.Interfaces;

public interface IProjectService
{
    public Task<Guid> CreateAsync(Project project);
    public Task<List<Project>> GetAllAsync(Guid userId);
    public Task DeleteAsync(Guid userId, Guid projectId);
}