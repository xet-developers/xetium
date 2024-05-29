using ExampleCore.Dal.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public record ReportInfo : BaseEntity<Guid>
    {
        public DateTime FirstDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
