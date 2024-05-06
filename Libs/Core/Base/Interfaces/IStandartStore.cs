using ExampleCore.Dal.Base;

namespace Domain.Interfaces;

public interface IStandartStore
{
    Task<T> GetByIdAsync<T>(Guid id) where T : BaseEntity<Guid>;
    Task<Guid> CreateAsync<T>(T entity) where T : BaseEntity<Guid>;
    Task UpdateAsync<T>(T entity) where T : BaseEntity<Guid>;
    Task DeleteAsync<T>(T entity) where T : BaseEntity<Guid>;
    Task<List<T>> GetAllAsync<T>() where T : BaseEntity<Guid>;
}