using Domain.Entity;

namespace Domain.Interfaces;

public interface ITasksInfoRepository
{
    public Task<List<SitePosition>> GetCompletedTaskAsync(UserSearchInfo userSearchInfo);
    public Task<List<TaskDetails>> GetPendingTasksAsync(UserSearchInfo userSearchInfo);
    public Task AddOrUpdateAsync(TaskDetails taskDetails);
}