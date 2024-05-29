using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace Infrastructure.Connection;

public class ReportConnection: IReportConnection
{
    private readonly IProjectConnectionService _projectConnectionService;
    public ReportConnection(IProjectConnectionService projectConnectionService)
    {
        _projectConnectionService = projectConnectionService;
    }
    
    public async Task<UserSearchesResponseDto> GetReportInfo(UserSearchesRequestDto request)
    {
        var res = await _projectConnectionService.GetReportInfoOrDefault(request);
        return res;
    }
}
