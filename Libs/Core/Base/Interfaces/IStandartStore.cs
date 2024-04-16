namespace Domain.Interfaces;

public interface IStandartStore<T>
{
    Task<T> GetByIdAsync(Guid id);
    Task<Guid> CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<List<T>> GetAllAsync();
}