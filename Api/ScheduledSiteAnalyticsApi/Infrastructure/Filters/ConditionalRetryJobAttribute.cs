using Domain.Entity;
using Domain.Interfaces;
using Hangfire;
using Hangfire.Common;
using Hangfire.States;
using Hangfire.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Filters;

public class ConditionalRetryJobAttribute: JobFilterAttribute, IApplyStateFilter
{
    private readonly IStandartStore _standartStore;
    private readonly Dictionary<Frequency, int> dayDictionary = new ()
    {
        { Frequency.Daily, 1 },
        { Frequency.Weekly, 7 },
        { Frequency.Monthly, 30 }
    };
    
    public ConditionalRetryJobAttribute(IStandartStore standartStore)
    {
        _standartStore = standartStore;
    }

    public void OnStateApplied(ApplyStateContext context, IWriteOnlyTransaction transaction)
    {
        var failedState = context.NewState as FailedState;

        if (failedState is null)
        {
            return;
        }

        var jobArgs = context.BackgroundJob.Job.Args;
        
        var taskDetailsArg = jobArgs.FirstOrDefault(a => a is TaskDetails);

        if (taskDetailsArg is null || taskDetailsArg is not TaskDetails taskDetails)
        {
            return;
        }


        if (taskDetails.Frequency is not Frequency.None)
        {
            var scheduleTime = taskDetails.ScheduleTime.AddDays(dayDictionary[taskDetails.Frequency]);
            var jobId = BackgroundJob.Schedule<IScheduleTask>(
                x => x.ScheduleTaskAsync(taskDetails),
                scheduleTime);
            // Когда-нибудь они сделают это асинхронным. А пока, shit happens 2x....
            var task =  _standartStore.GetByIdAsync<TaskDetails>(taskDetails.Id).ConfigureAwait(false).GetAwaiter().GetResult();

            task.JobId = jobId;
            _standartStore.UpdateAsync(task).ConfigureAwait(false).GetAwaiter().GetResult();

        }
        
        var taskInfo = new TaskInfo()
        {
            UserId = taskDetails.UserId,
            CompletionTime = taskDetails.ScheduleTime,
            IsCompleted = false,
            ProjectId = taskDetails.ProjectID
        };

        
        // Когда-нибудь они сделают это асинхронным. А пока, shit happens....
        _standartStore.CreateAsync(taskInfo).ConfigureAwait(false)
            .GetAwaiter()
            .GetResult();
    }

    public void OnStateUnapplied(ApplyStateContext context, IWriteOnlyTransaction transaction)
    {
    }
}