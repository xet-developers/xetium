using Api.Controllers.Clustering.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Core.Extensions;
using Domain.Entity;
using Api.Controllers.PositionReport;

namespace Api.Controllers
{
    [Route("generation")]
    public class GenerationController : ControllerBase
    {
        private IPositionReportService _positionReportService;
        private IClusteringService _clusteringService;

        public GenerationController(IPositionReportService positionReportService, IClusteringService clusteringService)
        { 
            _positionReportService = positionReportService;
            _clusteringService = clusteringService;
        }

        [HttpPost("positionreport")]
        public async Task<IActionResult> CreatePositionReport([FromBody] ReportRequest reportRequest)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
            var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);
            var report = new ReportInfo
            {
                Id = reportRequest.ProjectId,
                FirstDate = reportRequest.FirstDate,
                LastDate = reportRequest.LastDate,
            };

            var rep = await _positionReportService.GetPositionReportAsync(report, userID);

            if (rep == null)
            {
                return BadRequest("User doesn't have any projects or cannot find.");
            }

            return new FileStreamResult(rep, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = "Report.xlsx"
            };
        }

        [HttpPost("clusteringreport")]
        public async Task<IActionResult> CreateClusteringReport([FromBody] ClusteringRequest clusteringRequest)
        {
            var clustering = await _clusteringService.GetClusterQueriesUsingAiAsync(clusteringRequest.Query);

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
}
