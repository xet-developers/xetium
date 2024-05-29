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
    
    public async Task<List<SitePosition>> GetCompletedTaskAsync(UserSearchInfo userSearchInfo)
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

    public async Task AddOrUpdateAsync(TaskDetails taskDetails)
    {
        var existingTask = await _applicationDbContext.TaskDetails.FindAsync(taskDetails.Id);
        if (existingTask != null)
        {
            _applicationDbContext.Entry(existingTask).CurrentValues.SetValues(taskDetails);
        }
        else
        {
            await _applicationDbContext.TaskDetails.AddAsync(taskDetails);
        }
        await _applicationDbContext.SaveChangesAsync();
    }

    public async Task<List<TaskDetails>> GetPendingTasksAsync(UserSearchInfo userSearchInfo)
    {
        var res = await _applicationDbContext.TaskDetails
                             .Where(t => t.UserId == userSearchInfo.UserId && t.ProjectID == userSearchInfo.ProjectId && !t.IsCompleted)
                             .ToListAsync();
        return res;
    }
}