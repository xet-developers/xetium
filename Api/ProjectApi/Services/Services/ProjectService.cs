﻿using Domain.Entity;
using Domain.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class ProjectService: IProjectService
{
    private IProjectStore _projectStore;
    private IStandartStore _standartStore;
    private IDeleteProjectInfo _deleteProjectInfo;
    public ProjectService(IProjectStore projectStore, IStandartStore standartStore, IDeleteProjectInfo deleteProjectInfo)
    {
        _projectStore = projectStore;
        _standartStore = standartStore;
        _deleteProjectInfo = deleteProjectInfo;
    }
    public async Task<Guid> CreateAsync(Project project)
    {
         var res = await _standartStore.CreateAsync(project);
        
        return res;
    }

    public async Task<List<Project>> GetAllAsync(Guid userId)
    {
        var res = await _projectStore.GetAllAsync(userId);
        
        return res;
    }

    public  async Task DeleteAsync(Guid userId, Guid projectId)
    {
        var project = await _standartStore.GetByIdAsync<Project>(projectId);
        
        if (project is null ||
            project.UserId != userId)
        {
            throw new Exception("User not owner or project doesn't exist");
        }
        await _deleteProjectInfo.DeleteProjectInfoAsync(projectId);
        await _standartStore.DeleteAsync(project);
    }

    public async Task<Project?> UpdateAsync(Project project)
    {
        var curProj = await _standartStore.GetByIdAsync<Project>(project.Id);

        if (curProj.UserId != project.UserId)
        {
            return null;
        }

        curProj.Name = project.Name;
        curProj.Description = project.Description;
        curProj.Url = project.Url;
        
        var res = await _standartStore.UpdateAsync(curProj);
        return res;
    }
}