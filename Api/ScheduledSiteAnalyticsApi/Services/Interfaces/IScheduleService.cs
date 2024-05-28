using Domain.Entity;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;

namespace Services.Interfaces;

public interface IScheduleService
{
    public Task<TaskDetails> ScheduleTask(TaskDetails taskDetails);
    
    public Task DeleteTask(Guid taskId);

    public Task<UserSearchesResponseDto> GetCompletedTasksInfo(UserSearchInfo request);

}