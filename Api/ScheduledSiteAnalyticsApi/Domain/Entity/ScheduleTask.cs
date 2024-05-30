using ExampleCore.Dal.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    [Table("ScheduleTask")]
    public record ScheduleTask : BaseEntity<Guid>
    {
        public Guid UserId { get; set; }
        public ICollection<ScheduleTaskDetails> Details { get; set; }
    }
}
