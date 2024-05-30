using Domain.Entity;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Data;

public class ProjectStore: IProjectStore
{
    private ApplicationDbContex _applicationDbContex;

    public ProjectStore(ApplicationDbContex applicationDbContex)
    {
        _applicationDbContex = applicationDbContex;
    }
    public async Task<List<Project>> GetAllAsync(Guid userId)
    {
       var res = await _applicationDbContex.ProjectDbSet
            .Where(p => p.UserId == userId)
            .ToListAsync();

       return res;
    }
}