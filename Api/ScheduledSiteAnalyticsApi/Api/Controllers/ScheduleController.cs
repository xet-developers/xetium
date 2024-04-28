using Api.Controllers.ScheduleTask.Request;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
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
        await _scheduleService.ScheduleTask(new TaskDetails()
        {
            Id = scheduleRequest.Id,
            Keywords = scheduleRequest.Keywords,
            ScheduleTime = scheduleRequest.DateTime,
            Top = scheduleRequest.Top,
            SearchSystem = scheduleRequest.SearchSystem,
            Url = scheduleRequest.Url,
            Frequency = scheduleRequest.Frequency
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
    public async Task<IActionResult> GetAllTask()
    {
        return Ok();
    }
}