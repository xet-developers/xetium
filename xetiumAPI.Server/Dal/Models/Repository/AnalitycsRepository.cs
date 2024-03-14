using xetiumAPI.Interfaces;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class AnalitycsRepository: IAnalyticsRepository
{
    private ApplicationContextDb _applicationContextDb;
    public AnalitycsRepository(ApplicationContextDb applicationContextDb)
    {
        _applicationContextDb = applicationContextDb;
    }
    
    public async Task<ProjectDal?> FindProjectAsync(int projectId)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        var project = await dbSet.FindAsync(projectId);
        return project;
    }
    
    public async Task AddSearchInformation (KeywordResultDal keywordResultDal)
    {
        await _applicationContextDb.KeywordResultDal.AddAsync(keywordResultDal);
        await _applicationContextDb.SaveChangesAsync();
    }
}