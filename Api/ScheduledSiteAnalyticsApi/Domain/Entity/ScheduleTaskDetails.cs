using ExampleCore.Dal.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    [Table("ScheduleTaskDetails")]
    public record ScheduleTaskDetails : BaseEntity<Guid>
    {
        public required Guid ProjectID { get; set; }
        public required DateTime DateTime { get; set; }
        public ScheduleTask ScheduleTask { get; set; }
        public ICollection<SitePosition> PositionAnalysis { get; set; }
    }
}
