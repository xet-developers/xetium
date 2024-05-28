using Domain.Entity;

namespace Domain.Interfaces;

public interface ITasksInfoRepository
{
    public Task<List<SitePosition>> GetCompletedTask(UserSearchInfo userSearchInfo);
}