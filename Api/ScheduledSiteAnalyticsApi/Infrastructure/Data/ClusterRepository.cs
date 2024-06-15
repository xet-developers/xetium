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

        public async Task<List<Cluster>> GetUserClustersAsync(Guid userId, Guid projectId)
        {
            var res = await _applicationDbContext.Clusters.Where(cluster =>  cluster.UserId == userId && cluster.ProjectId == projectId).ToListAsync();    
            return res;
        }
    }
}
