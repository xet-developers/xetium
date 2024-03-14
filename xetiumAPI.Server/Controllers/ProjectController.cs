using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Extentions;
using xetiumAPI.ServerApp.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace xetiumAPI.ServerApp.Controllers;


[Route("project")]
[ApiController]
[Authorize]
public class ProjectController: Controller
{
    private IProjectService _projectService;
    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }
    
    [Route("create")]
    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] ProjectModelCreate modelCreate)
    {
        var userID = GetUserId();
        var result = await _projectService.CreateProjectAsync(modelCreate, userID);
        return Created("Slon Kuplen",new {Id = result.ProjectId});
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProjects()
    {
        var userID = GetUserId();
        var result = await _projectService.GetAllProjectsAsync(userID);
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
        var status= await _projectService.DeleteProjectAsync(userID,projectId);
        return status? Ok() : 
            BadRequest("Project not found or it's not your Project");
    }

    [HttpPatch("modify/\"{id:guid}\"")]
    public Task<IActionResult> ModifyProject(Guid projectId, ModifyProject modifyProject)
    {
        return null;
    }
}