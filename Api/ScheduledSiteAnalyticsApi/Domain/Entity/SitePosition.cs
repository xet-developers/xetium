using ExampleCore.Dal.Base;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;


namespace Domain.Entity
{
    
    [Table("siteposition")]
    public record SitePosition : BaseEntity<Guid>
    {
        public required Guid ProjectId { get; set; }
        public required Guid ClusterId { get; set; }
        public required DateTime Date { get; set; }
        public required string Keyword { get; set; }
        public required int Position { get; set; }
        public required int SearchSystem { get; set; }
        public required Guid ScheduleTaskDetailId { get; set; }
        
        [JsonIgnore]
        public ScheduleTaskDetails ScheduleTaskDetails { get; set; }
    }
}
