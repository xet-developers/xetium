using System.IdentityModel.Tokens.Jwt;
using Medo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.ServerApp.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Extentions;

namespace xetiumAPI.ServerApp.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : Controller
    {
        private IAuthenticationService _authenticationService;
        public AccountController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        
        
        [HttpGet]
        [Authorize]
        public IActionResult CheckAuth()
        {
            return Ok();
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            var registerResult = await _authenticationService.RegisterUserAsync(model);
            
            if (registerResult.Succeeded)
            {
                return Created("Alyona Kupi", new { state = registerResult.Succeeded });
            }

            foreach (var error in registerResult.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            var token = await _authenticationService.LoginUserAsync(model);
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
            var userInfo = await _authenticationService.GetUserInfoAsync(userId);
            return Ok(userInfo);
        }
        
        private Guid GetUserId()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
            var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);
            return userID;
        }
    }
}
