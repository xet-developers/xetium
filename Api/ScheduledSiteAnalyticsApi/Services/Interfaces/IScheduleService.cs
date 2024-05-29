using Domain.Entity;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;

namespace Services.Interfaces;

public interface IScheduleService
{
    public Task<TaskDetails> ScheduleTaskAsync(TaskDetails taskDetails);
    
    public Task DeleteTask(Guid taskId);

    public Task<UserSearchesResponseDto> GetCompletedTasksInfoAsync(UserSearchInfo request);
    public Task<UserSearchesResponseDto> GetPendingTasksInfoAsync(UserSearchInfo request);
    public Task<UserSearchesResponseDto> GetAllTasksInfoAsync(UserSearchInfo request);

}