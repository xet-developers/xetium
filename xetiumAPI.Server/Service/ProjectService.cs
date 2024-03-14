using Medo;
using Microsoft.AspNetCore.Identity;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Service;

public class ProjectService: IProjectService
{
    private IProjectRepository _projectRepository;
    private UserManager<UserDal> _userManager;
    public ProjectService(IProjectRepository projectRepository, UserManager<UserDal> userManager)
    {
        _projectRepository = projectRepository;
        _userManager = userManager;
    }
    public async Task<ProjectResponseDto> CreateProjectAsync(ProjectModelCreate modelCreate, Guid guid)
    {
        var userInfo = await _userManager.FindByIdAsync(guid.ToString());
        if (userInfo is null)
        {
            throw new KeyNotFoundException("User not found");
        }
        
        var projectId =  new Uuid7().ToGuid();
        var project = new ProjectDal()
        {
            ProjID = projectId,
            Name = modelCreate.Name,
            URL = modelCreate.Url,
            UserID = guid,
            User = userInfo,
            Searches = new List<SearchDal>(),
            Description = modelCreate.Description
        };

        await _projectRepository.CreateProjectAsync(project);
        return new ProjectResponseDto()
        {
            ProjectId = projectId
        };
    }

    public async Task<List<ProjectDto>> GetAllProjectsAsync(Guid userId)
    {
        var projects = await _projectRepository.GetAllUserProjectAsync(userId);
        var allProjects = projects
            .Select(p => new ProjectDto()
            {
                Id = p.ProjID,
                Name = p.Name,
                Url = p.URL,
                Description = p.Description,
                Searches = p.Searches.Select(s => new SearchesDto()
                {
                    Date = s.Date,
                    Type = s.Type,
                    KeywordResults = s.KeywordResults.Select(kr => new KeywordResultDto()
                    {
                        Position = kr.Position,
                        Keyword = new KeywordDto()
                        {
                            Text = kr.Text
                        }
                    }).ToList()
                }).ToList()
            }).ToList();

        
        return allProjects;
    }

    public async Task<bool> DeleteProjectAsync(Guid userId, Guid projectId)
    {
        var projectInfo = await _projectRepository.GetProjectByIdAsync(projectId);

        if (projectInfo is null || projectInfo.UserID != userId)
        {
            return false;
        }

        await _projectRepository.DeleteProjectAsync(projectInfo);

        return true;
    }
}