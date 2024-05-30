using System.IdentityModel.Tokens.Jwt;
using Core.Extensions;
using IdentityServerApi.Controllers.User.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace IdentityServerApi.Controllers;

[Route("account")]
[ApiController]
public class UserController: ControllerBase
{ 
    private IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    
    
    [HttpGet]
    [Authorize]
    public IActionResult CheckAuth()
    { 
        return Ok();
    }
        
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterRequest model)
    {
        var registerResult = await _userService.RegisterUserAsync(new Domain.Entities.User()
        {
            UserName = model.UserName,
            Email = model.Email,
        }, model.Password);


        if (registerResult.Succeeded)
        {
            return Ok(new {status = "succeed"});
        }
        
        foreach (var error in registerResult.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }
        
        return BadRequest(ModelState);
        
    } 
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest model)
    {
        var token = await _userService.LoginUserAsync(new Domain.Entities.User()
        {
            UserName = model.UserName
        }, model.Password);
        
        
        if (token is null)
        {
            return Unauthorized();
        }
 
        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
    }

    [HttpGet("info")]
    [Authorize]
    public async Task<IActionResult> GetUserInfo()
    { 
        var userId = GetUserId();
        
        var userInfo = await _userService.GetUserInfoAsync(userId);
        
        return Ok(userInfo);
    }
        
    private Guid GetUserId()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
        var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);
        return userID;
    }
}