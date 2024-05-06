using System.Linq.Expressions;
using System.Reflection;
using Domain.Entity;
using Domain.Interfaces;
using Hangfire;
using Services.Interfaces;

namespace Services.Services;

public class ScheduleService: IScheduleService
{

    private readonly IScheduleTask _scheduleTask;
    public ScheduleService(IScheduleTask scheduleTask)
    {
        _scheduleTask = scheduleTask;
    }
    
    public async Task<TaskDetails> ScheduleTask(TaskDetails taskDetails)
    {
        // Получаем MethodInfo для метода ScheduleFunction
        
        // todo сделать кэш, который будет хранить айдишники уже созданных тасок, чтобы если брокер по 100-500 nagadit сообщениями, не делать запросики в бд
        await taskDetails.AddOrUpdateAsync(_scheduleTask);
        
        return taskDetails;
    }
    
    public async Task DeleteTask(Guid taskId)
    {
        
        await Task.Run(() => RecurringJob.RemoveIfExists(taskId.ToString()))
            .ConfigureAwait(false);
    }
}