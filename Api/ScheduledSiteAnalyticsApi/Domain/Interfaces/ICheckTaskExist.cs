namespace Domain.Interfaces;

public interface ICheckTaskExist
{
    Task<bool> TaskExists(string taskId);
}