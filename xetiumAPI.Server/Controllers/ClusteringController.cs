using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace xetiumAPI.ServerApp.Controllers;

[Route("clustering")]
[ApiController]
[Authorize]
public class ClusteringController: Controller
{
    private IClusteringService _clusteringService;

    public ClusteringController(IClusteringService clusteringService)
    {
        _clusteringService = clusteringService;
    }

    [HttpPost]
    public async Task<IActionResult> GetClustering([FromBody] ClusteringData clusteringData)
    {
        var clustering = await _clusteringService.GetClusterQueriesUsingAiAsync(clusteringData.Query);

        if (clustering is null)
        {
            return BadRequest();
        }
        return new FileStreamResult(clustering, "text/plain")
        {
            FileDownloadName = "Clustering.txt"
        };
    }
}