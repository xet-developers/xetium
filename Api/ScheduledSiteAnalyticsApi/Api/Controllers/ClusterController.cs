using Api.Controllers.Cluster;
using Core.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace Api.Controllers
{
    
    [Route("cluster")]
    [ApiController]
    [Authorize]
    public class ClusterController : ControllerBase
    {
        private IClusterService _clusterService;

        public ClusterController(IClusterService clusterService)
        {
           _clusterService = clusterService;
        }


        [HttpPost("create")]
        public async Task<IActionResult> CreateTask([FromBody] ClusterRequest clusterRequest)
        {
            var userID = (Guid)HttpContext.Items["UserId"];

            var id = await _clusterService.CreateClusterAsync(new Domain.Entity.Cluster 
            { 
                UserId = userID,
                Keywords = clusterRequest.Keywords 
            });

            return Ok(id);
        }


        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteTask([FromQuery] Guid id)
        {
            var res = await _clusterService.DeleteClusterAsync(id);
            if(!res)
            {
                return NotFound("User or cluster not found");
            }

            return Ok("deleted");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClusters()
        {
            var userID = (Guid)HttpContext.Items["UserId"];
            var res = await _clusterService.GetAllClustersAsync(userID);

            return Ok(res);
        }
    }
}
