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

    public ScheduleService(ITasksInfoRepository tasksInfoRepository)
    {
        _tasksInfoRepository = tasksInfoRepository;
    }

    public async Task<TaskDetails> ScheduleTask(TaskDetails taskDetails)
    {
        // todo сделать кэш, который будет хранить айдишники уже созданных тасок, чтобы если брокер по 100-500 nagadit сообщениями, не делать запросики в бд
        await taskDetails.AddOrUpdateAsync();
        
        return taskDetails;
    }
    
    public Task DeleteTask(Guid taskId)
    {
        RecurringJob.RemoveIfExists(taskId.ToString());
        return Task.CompletedTask;
    }

    public async Task<UserSearchesResponseDto> GetCompletedTasksInfo(UserSearchInfo request)
    {
        var completedTasks = await _tasksInfoRepository.GetCompletedTask(request);

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
                SearchSystem = task.SearchSystem
            });
        }
        
        return res;
    }
}