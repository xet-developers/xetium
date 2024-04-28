using Domain.Entity;

namespace Domain.Interfaces;

public interface IScheduleTask
{
    public Task ScheduleTask(TaskDetails taskDetails);

}