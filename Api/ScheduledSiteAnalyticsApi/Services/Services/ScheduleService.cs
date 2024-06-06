using System.Linq.Expressions;
using System.Reflection;
using Domain.Entity;
using Domain.Interfaces;
using Hangfire;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;
using Services.Interfaces;

namespace Services.Services;

public class ScheduleService: IScheduleService
{
    private ITasksInfoRepository _tasksInfoRepository;

    private IStandartStore _standartStore;
    public ScheduleService(ITasksInfoRepository tasksInfoRepository, IStandartStore standartStore)
    {
        _standartStore = standartStore;
        _tasksInfoRepository = tasksInfoRepository;
    }

    public async Task<TaskDetails> ScheduleTaskAsync(TaskDetails taskDetails)
    {
        // todo сделать кэш, который будет хранить айдишники уже созданных тасок, чтобы если брокер по 100-500 nagadit сообщениями, не делать запросики в бд
        await taskDetails.AddAsync(_standartStore);
        await _tasksInfoRepository.AddOrUpdateAsync(taskDetails);
        return taskDetails;
    }
    
    
    public Task<bool> DeleteTaskAsync(string JobId)
    {
        var state = BackgroundJob.Delete(JobId);
        
        return Task.FromResult(state);
    }

    public async Task<TaskDetails?> UpdateTaskAsync(TaskDetails? taskDetails)
    {
        var state =await taskDetails.UpdateAsync(_standartStore);
        return state ? taskDetails : null;
    }

    public async Task<List<SitePosition>> GetCompletedTasksInfoAsync(UserSearchInfo request)
    {
        var completedTasks = await _tasksInfoRepository.GetCompletedTaskAsync(request);
        
        return completedTasks;
    }

    public async Task<List<TaskDetails>> GetPendingTasksInfoAsync(UserSearchInfo request)
    {
        var pendingTasks = await _tasksInfoRepository.GetPendingTasksAsync(request);
        return pendingTasks;
    }

    public async Task<Tasks> GetAllTasksInfoAsync(UserSearchInfo request)
    {
        var pending = await GetPendingTasksInfoAsync(request);
        var completed = await GetCompletedTasksInfoAsync(request);

        var allUserTasks = new Tasks()
        {
            CompletedTask = completed,
            UncompletedTask = pending
        };

        return allUserTasks;
    }
}