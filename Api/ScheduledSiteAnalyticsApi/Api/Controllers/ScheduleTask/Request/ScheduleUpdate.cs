namespace Api.Controllers.ScheduleTask.Request;

public class ScheduleUpdate : ScheduleRequest
{
    public required Guid Id { get; set; }
    public required string JobId { get; set; }
}