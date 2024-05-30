using Api.Controllers.ScheduleTask.Request;
using Core.Extensions;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
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
        var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
        var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

        await _scheduleService.ScheduleTaskAsync(new TaskDetails()
        {
            UserId = userID,
            ProjectID = scheduleRequest.ProjectID,
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


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteTask([FromQuery] Guid id)
    {
       await _scheduleService.DeleteTask(id);

       return Ok("deleted");
    }

    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTask([FromBody] ScheduleRequest scheduleRequest)
    {
        await CreateTask(scheduleRequest);

        return Ok("updated");
    }


    [HttpGet]
    public async Task<ActionResult<UserSearchesRequestDto>> GetAllTask([FromQuery] Guid projectId, DateTime firstDate, DateTime lastDate)
    {
        var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
        var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

        var res = await _scheduleService.GetAllTasksInfoAsync(new UserSearchInfo
        {
            UserId = userID,
            ProjectId = projectId,
            FirstDate = firstDate,
            LastDate = lastDate
        });

        return Ok(res);
    }
}