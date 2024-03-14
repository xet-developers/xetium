using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Interfaces;
public interface IAuthenticationService
{
    public Task<IdentityResult> RegisterUserAsync(UserRegisterModel userRegisterModel);
    public Task<JwtSecurityToken> LoginUserAsync(UserLoginModel userLogin);

    public Task<UserInfoDto> GetUserInfoAsync(Guid userId);
}

