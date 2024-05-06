using ExampleCore.Dal.Base;
using Hangfire;

namespace Domain.Entity;

public record TaskDetails: BaseEntity<Guid>
{
    public required DateTime ScheduleTime { get; set; }
    public required Guid ProjectID { get; set; }
    public required string Url { get; set; }
   
    public required int Top { get; set; }
    
    public required int Frequency { get; set; }

    public required string[] Keywords { get; set; }
    
    public required int SearchSystem { get; set; }
    
    public async Task AddOrUpdateAsync(Func<TaskDetails, Task> methodCall)
    {
        var random = new Random();

        var entropy = random.Next(10, 240);
        
        var executionTime  = ScheduleTime.AddSeconds(entropy);
        
        await Task.Run( () => RecurringJob.AddOrUpdate(Id.ToString(), 
             () => methodCall(this),$"{executionTime.Minute} {executionTime.Hour} ** {executionTime.Day}"))
            .ConfigureAwait(false);
    }
    
}