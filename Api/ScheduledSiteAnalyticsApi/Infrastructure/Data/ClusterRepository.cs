using Domain.Entity;
using Domain.Interfaces;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ClusterRepository : IClusterRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ClusterRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<Cluster>> GetUserClustersAsync(Guid userId)
        {
            var res = await _applicationDbContext.Clusters.Where(cluster =>  cluster.UserId == userId).ToListAsync();    
            return res;
        }
    }
}
