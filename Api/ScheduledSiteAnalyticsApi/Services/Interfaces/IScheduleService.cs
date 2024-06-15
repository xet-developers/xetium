using Domain.Entity;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;

namespace Services.Interfaces;

public interface IScheduleService
{
    public Task<TaskDetails> ScheduleTaskAsync(TaskDetails taskDetails);
    
    public Task<bool> DeleteTaskAsync(string jobId, Guid taskId);
    public Task<TaskDetails?> UpdateTaskAsync(TaskDetails? taskDetails);
    public Task<List<SitePosition>> GetReportInfoAsync(UserSearchInfo request);
    public Task<List<SitePosition>> GetCompletedTasksInfoAsync(UserSearchInfo request);
    public Task<List<TaskDetails>> GetPendingTasksInfoAsync(UserSearchInfo request);
    public Task<Tasks> GetAllTasksInfoAsync(UserSearchInfo request);

}