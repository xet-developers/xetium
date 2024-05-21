﻿using System.Linq.Expressions;
using Domain.Interfaces;
using ExampleCore.Dal.Base;
using Hangfire;
using Hangfire.Common;
using Microsoft.Extensions.DependencyInjection;

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
    
    public Task AddOrUpdateAsync()
    {
        var random = new Random();

        var entropy = random.Next(10, 240);
        
        var executionTime  = ScheduleTime.AddSeconds(entropy);
        
        RecurringJob.AddOrUpdate<IScheduleTask>(
            Id.ToString(),
            x => x.ScheduleTaskAsync(this),
            $"{executionTime.Minute} {executionTime.Hour} ** {executionTime.Day}",
            new RecurringJobOptions { TimeZone = TimeZoneInfo.Utc});
        
        return Task.CompletedTask;
    }
}