using Domain.Entity;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class TaskInfoRepository: ITasksInfoRepository
{
    private readonly ApplicationDbContext _applicationDbContext;
    
    public TaskInfoRepository(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
    
    public async Task<List<SitePosition>> GetCompletedTask(UserSearchInfo userSearchInfo)
    {

       var res = await _applicationDbContext.SitePositions.Include(sp => sp.ScheduleTaskDetails)
            .ThenInclude(std => std.ScheduleTask)
            .Where(sp => 
                sp.ProjectId == userSearchInfo.ProjectId 
                && sp.ScheduleTaskDetails.ScheduleTask.UserId == userSearchInfo.UserId 
                && sp.Date >= userSearchInfo.FirstDate 
                && sp.Date <= userSearchInfo.LastDate)
            .ToListAsync();

       return res;
    }
}