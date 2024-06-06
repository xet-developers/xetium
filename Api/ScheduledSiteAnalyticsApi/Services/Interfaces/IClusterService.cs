using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IClusterService
    {
        public Task<Guid> CreateClusterAsync(Cluster cluster);
        public Task<bool> DeleteClusterAsync(Guid userId);
        public Task<List<Cluster>> GetAllClustersAsync(Guid userId);
    }
}
