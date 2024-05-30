using Core.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectApi.Controllers.Project.Request;
using Services.Interfaces;

namespace ProjectApi.Controllers;

[Route("project")]
[ApiController]
public class ProjectController: ControllerBase
{
    private IProjectService _projectService;
    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }
    
    [Route("create")]
    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] ProjectCreateRequest modelCreate)
    {
        var userID = GetUserId();
        
        var result = await _projectService.CreateAsync(new Domain.Entity.Project()
        {
            Description = modelCreate.Description,
            Name = modelCreate.Name,
            Url = modelCreate.Url,
            UserId = userID
        });
        return Created("Slon Kuplen",new {Id = result});
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProjects()
    {
        var userID = GetUserId();
        var result = await _projectService.GetAllAsync(userID);
        return Ok(result);
    }

    private Guid GetUserId()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
        var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);
        return userID;
    }

    [HttpDelete("{projectId:guid}")]
    public async Task<IActionResult> DeleteProject([FromRoute] Guid projectId)
    {
        var userID = GetUserId();
        
        await _projectService.DeleteAsync(userID,projectId);
        return Ok();
    }
}