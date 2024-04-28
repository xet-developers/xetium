using Domain.Entity;

namespace Services.Interfaces;

public interface IScheduleService
{
    public Task<TaskDetails> ScheduleTask(TaskDetails taskDetails);
    
    public Task DeleteTask(Guid taskId);
}