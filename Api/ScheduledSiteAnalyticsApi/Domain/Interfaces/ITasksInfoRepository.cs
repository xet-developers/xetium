using Domain.Entity;

namespace Domain.Interfaces;

public interface ITasksInfoRepository
{
    public Task<List<SitePosition>> GetCompletedTaskAsync(UserSearchInfo userSearchInfo);
    public Task<List<TaskDetails>> GetPendingTasksAsync(UserSearchInfo userSearchInfo);
    public Task AddOrUpdateAsync(TaskDetails taskDetails);
    public Task<List<SitePosition>> GetTaskReportAsync(UserSearchInfo userSearchInfo);
    public Task<List<TaskInfo>> GetTopFiveTasks(UserSearchInfo userSearchInfo);
}