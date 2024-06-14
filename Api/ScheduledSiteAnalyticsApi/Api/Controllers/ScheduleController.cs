using Api.Controllers.ScheduleTask.Request;
using Core.Extensions;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using Services.Interfaces;

namespace Api.Controllers;



[Route("scheduletask")]
[ApiController]
public class ScheduleController: ControllerBase
{
    private IScheduleService _scheduleService;
    
    public ScheduleController(IScheduleService scheduleService)
    {
        _scheduleService = scheduleService;
    }

    
    [HttpPost("create")]
    public async Task<IActionResult> CreateTask([FromBody] ScheduleRequest scheduleRequest)
    { 
        
        var userID = (Guid)HttpContext.Items["UserId"];

       var res = await _scheduleService.ScheduleTaskAsync(new TaskDetails()
        {
            UserId = userID,
            ProjectID = scheduleRequest.ProjectID,
            ClusterId = scheduleRequest.ClusterId,
            Keywords = scheduleRequest.Keywords,
            ScheduleTime = scheduleRequest.DateTime,
            Top = scheduleRequest.Top,
            SearchSystem = scheduleRequest.SearchSystem,
            Url = scheduleRequest.Url,
            Frequency = scheduleRequest.Frequency,
            IsCompleted = false
        });
       
        return Ok("created");
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteTask([FromQuery] string jobId, Guid taskId )
    {
        var res = await _scheduleService.DeleteTaskAsync(jobId, taskId);

        return res
            ? Ok("deleted")
            : BadRequest("UwU");
    }
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTask([FromBody] ScheduleUpdate scheduleRequest)
    {
        
        var userID = (Guid)HttpContext.Items["UserId"];
        
        var res = await _scheduleService.UpdateTaskAsync(new TaskDetails()
        {
            Frequency = scheduleRequest.Frequency,
            Id = scheduleRequest.Id,
            ProjectID = scheduleRequest.ProjectID,
            ClusterId = scheduleRequest.ClusterId,
            JobId = scheduleRequest.JobId,
            Keywords = scheduleRequest.Keywords,
            ScheduleTime = scheduleRequest.DateTime,
            SearchSystem = scheduleRequest.SearchSystem,
            Top = scheduleRequest.Top,
            Url = scheduleRequest.Url,
            UserId = userID
        });

        return res is null ? BadRequest("try later or don't exist") : 
            Ok(res);
    }


    [HttpGet]
    public async Task<ActionResult<UserSearchesRequestDto>> GetAllTask([FromQuery] Guid projectId, DateTime firstDate, DateTime lastDate)
    {
        var userID = (Guid)HttpContext.Items["UserId"];

        var res = await _scheduleService.GetAllTasksInfoAsync(new UserSearchInfo
        {
            UserId = userID,
            ProjectId = projectId,
            FirstDate = firstDate,
            LastDate = lastDate
        });

        return Ok(JsonConvert.SerializeObject(res));
    }
}