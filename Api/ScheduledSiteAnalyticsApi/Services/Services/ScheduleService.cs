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
        await taskDetails.AddOrUpdateAsync(_standartStore);
        await _tasksInfoRepository.AddOrUpdateAsync(taskDetails);
        return taskDetails;
    }
    
    public Task DeleteTask(Guid taskId)
    {
        RecurringJob.RemoveIfExists(taskId.ToString());
        return Task.CompletedTask;
    }

    public async Task<UserSearchesResponseDto> GetCompletedTasksInfoAsync(UserSearchInfo request)
    {
        var completedTasks = await _tasksInfoRepository.GetCompletedTaskAsync(request);

        var res = new UserSearchesResponseDto()
        {
            PositionAnalysisData = new List<PositionAnalysis>()
        };
        
        foreach (var task in completedTasks)
        {
            res.PositionAnalysisData.Add(new PositionAnalysis()
            {
                Date = task.Date,
                Keyword = task.Keyword,
                Position = task.Position,
                SearchSystem = task.SearchSystem,
                IsCompleted = true
            });
        }
        
        return res;
    }

    public async Task<UserSearchesResponseDto> GetPendingTasksInfoAsync(UserSearchInfo request)
    {
        var pendingTasks = await _tasksInfoRepository.GetPendingTasksAsync(request);

        var res = new UserSearchesResponseDto()
        {
            PositionAnalysisData = new List<PositionAnalysis>()
        };

        foreach (var task in pendingTasks)
        {
            res.PositionAnalysisData.Add(new PositionAnalysis()
            {
                Date = task.ScheduleTime,
                Keyword = task.Keywords.First(),
                Position = -1,
                SearchSystem = task.SearchSystem,
                IsCompleted = false
            });
        }

        return res;
    }

    public async Task<UserSearchesResponseDto> GetAllTasksInfoAsync(UserSearchInfo request)
    {
        var pending = await GetPendingTasksInfoAsync(request);
        var completed = await GetCompletedTasksInfoAsync(request);

        pending.PositionAnalysisData.AddRange(completed.PositionAnalysisData);

        var res = new UserSearchesResponseDto()
        {
            PositionAnalysisData = pending.PositionAnalysisData
        };

        return res;
    }
}