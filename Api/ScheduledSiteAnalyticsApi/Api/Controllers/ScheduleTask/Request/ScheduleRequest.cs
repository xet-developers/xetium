namespace Api.Controllers.ScheduleTask.Request;

public class ScheduleRequest
{
    public required Guid ProjectID { get; set; }
    public required DateTime DateTime { get; set; }
    
    public required int Frequency { get; set; }
    
    public required string Url { get; set; }
    
    public required string[] Keywords { get; set; }

    public required int SearchSystem { get; set; }
    
    public required int Top { get; set; }
}