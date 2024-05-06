using Domain.Interfaces;
using ExampleCore.Dal.Base;
using Medo;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Data;

public class BaseRepository: IStandartStore
{
    private readonly DbContext _applicationDbContext;
    public BaseRepository(DbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<T> GetByIdAsync<T>(Guid id)
        where T : BaseEntity<Guid>
    {
        var res = await _applicationDbContext.Set<T>().FindAsync(id);

        if (res is null)
        {
            throw new Exception("Data not found");
        }

        return res;
    }

    public async Task<Guid> CreateAsync<T>(T entity)
        where T : BaseEntity<Guid>
    {
        var entityId = new Uuid7().ToGuid();
        entity.Id = entityId;
        await _applicationDbContext.Set<T>().AddAsync(entity);
        await _applicationDbContext.SaveChangesAsync();
        
        return entityId;
    }

    public async Task UpdateAsync<T>(T entity)
        where T : BaseEntity<Guid>
    {
        _applicationDbContext.Set<T>().Update(entity);

        await _applicationDbContext.SaveChangesAsync();
    }
    

    public async Task DeleteAsync<T>(T entity)
        where T : BaseEntity<Guid>
    {
        _applicationDbContext.Set<T>().Remove(entity);

        await _applicationDbContext.SaveChangesAsync();
    }

    public async Task<List<T>> GetAllAsync<T>()
        where T : BaseEntity<Guid>
    {
        var res = await _applicationDbContext.Set<T>().ToListAsync();

        return res;
    }
}