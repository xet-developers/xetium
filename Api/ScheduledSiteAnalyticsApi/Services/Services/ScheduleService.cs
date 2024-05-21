using System.Linq.Expressions;
using System.Reflection;
using Domain.Entity;
using Domain.Interfaces;
using Hangfire;
using ProfileConnectionLib.ConnectionServices.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class ScheduleService: IScheduleService
{
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
}