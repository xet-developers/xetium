using Domain.Interfaces;
using ExampleCore.Dal.Base;
using Medo;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Data;

public class BaseRepository<T>: IStandartStore<T> 
    where T: BaseEntity<Guid>
{
    private readonly DbContext _applicationDbContext;
    public BaseRepository(DbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
    
    public async Task<T> GetByIdAsync(Guid id)
    {
        var res = await _applicationDbContext.Set<T>().FindAsync(id);

        if (res is null)
        {
            throw new Exception("Data not found");
        }

        return res;
    }

    public async Task<Guid> CreateAsync(T entity)
    {
        var entityId = new Uuid7().ToGuid();
        entity.Id = entityId;
        await _applicationDbContext.Set<T>().AddAsync(entity);
        await _applicationDbContext.SaveChangesAsync();
        
        return entityId;
    }

    public async Task UpdateAsync(T entity)
    {
        _applicationDbContext.Set<T>().Update(entity);

        await _applicationDbContext.SaveChangesAsync();
    }
    

    public async Task DeleteAsync(T entity)
    {
        _applicationDbContext.Set<T>().Remove(entity);

        await _applicationDbContext.SaveChangesAsync();
    }

    public async Task<List<T>> GetAllAsync()
    {
        var res = await _applicationDbContext.Set<T>().ToListAsync();

        return res;
    }
}