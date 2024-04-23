using Domain.Entity;

namespace Domain.Interfaces;

public interface IProjectStore
{
    Task<List<Project>> GetAllAsync(Guid userId);
}