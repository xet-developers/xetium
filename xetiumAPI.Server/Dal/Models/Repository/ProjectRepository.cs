using Microsoft.EntityFrameworkCore;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class ProjectRepository: IProjectRepository
{
    private ApplicationContextDb _applicationContextDb;
    public ProjectRepository(ApplicationContextDb applicationContextDb)
    {
        _applicationContextDb = applicationContextDb;
    }
    public async Task CreateProjectAsync(ProjectDal userDal)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        await dbSet.AddAsync(userDal);
        await _applicationContextDb.SaveChangesAsync();
    }

    public async Task<List<ProjectDal>> GetAllUserProjectAsync(Guid id)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        var projects = await dbSet
            .Where(p => p.UserID == id)
            .Include(projectDal => projectDal.Searches)
            .ThenInclude(searchDal => searchDal.KeywordResults)
            .ToListAsync();
        
        return projects;
    }

    public async Task<ProjectDal?> GetProjectByIdAsync(Guid id)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        var project = await dbSet
            .Include(p => p.User) 
            .SingleOrDefaultAsync(p => p.ProjID == id);
        return project;
    }

    public async Task DeleteProjectAsync(ProjectDal project)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        dbSet.Remove(project);
        await _applicationContextDb.SaveChangesAsync();
    }
}