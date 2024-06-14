using ExampleCore.Dal.Base;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public record ReportInfo : BaseEntity<Guid>
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid ClusterId { get; set; }
        public DateTime CreationDate {  get; set; }
        public DateTime FirstDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
