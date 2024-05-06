using ExampleCore.Dal.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public record SitePosition : BaseEntity<Guid>
    {
        public required DateTime Date { get; set; }
        public required string Keyword { get; set; }
        public required int Position { get; set; }
        public required int SearchSystem { get; set; }
        public required Guid ScheduleTaskDetailId { get; set; }
        public ScheduleTaskDetails ScheduleTaskDetails { get; set; }
    }
}
