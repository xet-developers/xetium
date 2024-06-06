namespace Domain.Entity;

public class Tasks
{
    public required List<SitePosition> CompletedTask { get; set; }
    public required List<TaskDetails> UncompletedTask { get; set; }
}