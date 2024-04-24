using Api.Controllers.Request;
using Api.Controllers.Response;
using Domain.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace Api.Controllers;

[Route("analytics")]
[ApiController]
[Authorize]
public class PositionsController : Controller
{
    private ISitePositionService _positionService;
    public PositionsController(ISitePositionService positionService)
    {
        _positionService = positionService;
    }

    [HttpPost]
    public async Task<IActionResult> GetSitePosition([FromBody] SearchDtoRequest site)
    {
        if (!Enum.IsDefined(typeof(SearchSystem), site.SearchSystem))
        {
            return BadRequest("invalid search system");
        }

        var positionResult = await _positionService.GetPositionAsync(new SearchInfo 
        { Keywords = site.Keywords,
        URI = site.URI,
        Top = site.Top,
        SearchSystem = site.SearchSystem
        });

        return positionResult is null ? BadRequest("uwu") :
            Ok(positionResult);
    }
}