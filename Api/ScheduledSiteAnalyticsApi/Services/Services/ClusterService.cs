using Domain.Entity;
using Domain.Interfaces;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ClusterService : IClusterService
    {
        private readonly IStandartStore _store;
        private readonly IClusterRepository _repository;
        public ClusterService(IStandartStore standartStore, IClusterRepository clusterRepository)
        { 
            _store = standartStore;
            _repository = clusterRepository;
        }
        public async Task<Guid> CreateClusterAsync(Cluster cluster)
        {
            var res = await _store.CreateAsync(cluster);
            return res;
        }

        public async Task<bool> DeleteClusterAsync(Guid userId)
        {
            var cluster = await _store.GetByIdAsync<Cluster>(userId);
            if(cluster is null)
            {
                return false;
            }

            await _store.DeleteAsync(cluster);
            return true;
        }

        public async Task<List<Cluster>> GetAllClustersAsync(Guid userId, Guid projectId)
        {
            var res = await _repository.GetUserClustersAsync(userId, projectId);
            return res;
        }
    }
}
