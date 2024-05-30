using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;
using Domain.Interfaces;
using ExampleCore.Dal.Base;
using Hangfire;
using Hangfire.Common;
using Medo;
using Microsoft.Extensions.DependencyInjection;

namespace Domain.Entity;


[Table("tasks")]
public record TaskDetails: BaseEntity<Guid>
{
    public required DateTime ScheduleTime { get; set; }
    public required Guid UserId { get; set; }
    public required Guid ProjectID { get; set; }
    public required string Url { get; set; }
   
    public required int Top { get; set; }
    
    public required int Frequency { get; set; }

    public required string[] Keywords { get; set; }
    
    public required int SearchSystem { get; set; }
    public bool IsCompleted { get; set; }
    
    public  async Task AddOrUpdateAsync(IStandartStore standartStore)
    {
        Id = new Uuid7().ToGuid();
        var random = new Random();

        var entropy = random.Next(10, 240);
        
        var executionTime  = ScheduleTime.AddSeconds(entropy);
        
        await standartStore.CreateAsync(this);
        RecurringJob.AddOrUpdate<IScheduleTask>(
                Id.ToString(),
                x => x.ScheduleTaskAsync(this),
                Cron.Minutely,
                new RecurringJobOptions { TimeZone = TimeZoneInfo.Utc});
        
    }
}