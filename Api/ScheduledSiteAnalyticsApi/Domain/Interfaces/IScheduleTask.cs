using Domain.Entity;

namespace Domain.Interfaces;

public interface IScheduleTask
{
    public Task ScheduleTaskAsync(TaskDetails taskDetails);

}