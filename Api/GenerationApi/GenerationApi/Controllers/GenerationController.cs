using Api.Controllers.Clustering.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Core.Extensions;
using Domain.Entity;
using Api.Controllers.PositionReport;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("generation")]
    [ApiController]
    [Authorize]
    public class GenerationController : ControllerBase
    {
        private IPositionReportService _positionReportService;
        private IAiGenerationService _iaiGenerationService;
  

        public GenerationController(IPositionReportService positionReportService, IAiGenerationService iaiGenerationService)
        { 
            _positionReportService = positionReportService;
            _iaiGenerationService = iaiGenerationService;
        }

        [HttpGet("allreport")]
        public async Task<IActionResult> GetAllReportInfo([FromQuery] Guid projectId)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
            var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

            var res = await _positionReportService.GetAllReportsInfo(userID, projectId);
            return Ok(res);
        }
        
        [HttpGet("completedreport")]
        public async Task<IActionResult> GetCompletedReport([FromQuery] Guid reportId)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
            var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

            var res = await _positionReportService.GetCompletedReportAsync(reportId, userID);
            return new FileStreamResult(res, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = "Report.xlsx"
            };
        }
        [HttpPost("positionreport")]
        public async Task<IActionResult> CreatePositionReport([FromBody] ReportRequest reportRequest)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
            var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);
            var report = new ReportInfo
            {
                UserId = userID,
                ClusterId = reportRequest.ClusterId,
                ProjectId = reportRequest.ProjectId,
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
            var clustering = await _iaiGenerationService.GetClusterQueriesUsingAiAsync(clusteringRequest.Query);

            if (clustering is null)
            {
                return BadRequest();
            }
            return new FileStreamResult(clustering, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            {
                FileDownloadName = "Clustering.docx"
            };
        }

        [HttpPost("auto")]
        public async Task<IActionResult> CreateQuerry([FromBody] QueryRequest queryRequest)
        {
            var res = await _iaiGenerationService.GetAutoQueryGeneration(new Query()
            {
                Intent = queryRequest.Intents,
                Keywords = queryRequest.Keywords,
                NumberOfGeneratedWords = queryRequest.NumberOfGeneratedWords
            });

            if (!res.Status)
            {
                return BadRequest("Некоректный запрос, попробуйте ещё раз");
            }
            
            return Ok(new QueryResponse()
            {
                Comparison = res.Comparison,
                Informational = res.Informational,
                Navigational = res.Navigational,
                Transactional = res.Transactional
            });
            
        }
    }
}
