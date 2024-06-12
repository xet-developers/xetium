using ExampleCore.Dal.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Domain.Entity
{
    public record Cluster : BaseEntity<Guid>
    {
        [JsonIgnore]
        public Guid UserId { get; set; }
        public required string[] Keywords { get; set; }
    }
}
