using Domain.Entity;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Data;

public class ProjectStore: IProjectStore
{
    private ApplicationDbContext _applicationDbContext;

    public ProjectStore(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
    public async Task<List<Project>> GetAllAsync(Guid userId)
    {
       var res = await _applicationDbContext.ProjectDbSet
            .Where(p => p.UserId == userId)
            .ToListAsync();

       return res;
    }
}