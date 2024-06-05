using ExampleCore.Dal.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public record Cluster : BaseEntity<Guid>
    {
        public Guid UserId { get; set; }
        public required string[] Keywords { get; set; }
    }
}
