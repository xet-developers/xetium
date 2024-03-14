using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using Medo;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Service;

public class AccountService : IAuthenticationService
{
    private IUserRepository _userRepository;
    private UserManager<UserDal> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;

    public AccountService(IUserRepository userRepository, UserManager<UserDal> userManager,
        RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userRepository = userRepository;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IdentityResult> RegisterUserAsync(UserRegisterModel userRegisterModel)
    {
        var id = new Uuid7().ToGuid();
        var user = new UserDal
        {
            UserName = userRegisterModel.UserName,
            Email = userRegisterModel.Email,
            Id = id,
            Name = userRegisterModel.Name
        };
        var createResult = await _userManager.CreateAsync(user, userRegisterModel.Password);
        if (!createResult.Succeeded)
        {
            return createResult;
        }


        if (!await _roleManager.RoleExistsAsync(UserRoles.User))
        {
            await _roleManager.CreateAsync(new IdentityRole<Guid>(UserRoles.User));
        }

        if (await _roleManager.RoleExistsAsync(UserRoles.User))
        {
            await _userManager.AddToRoleAsync(user, UserRoles.User);
        }

        return createResult;
    }

    public async Task<JwtSecurityToken> LoginUserAsync(UserLoginModel userLogin)
    {
        var user = await _userManager.FindByNameAsync(userLogin.UserName);
        if (user == null || !await _userManager.CheckPasswordAsync(user, userLogin.Password))
        {
            return null;
        }

        var userRoles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>()
            {
                new(ClaimTypes.Name, user.UserName),
                new("id", user.Id.ToString()),
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(nameof(IdentityUser.SecurityStamp), user.SecurityStamp)
            };
        claims.AddRange(userRoles.Select(userRole =>
                new Claim(ClaimTypes.Role, userRole)));

        var token = GetToken(claims);
        return token;
    }

    public async Task<UserInfoDto> GetUserInfoAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
        {
            throw new Exception("User Not Found");
        }
        var userUuid7 = (Uuid7)userId;
        return new UserInfoDto()
        {
            UserName = user.UserName,
            Mail = user.Email,
            DateTime = userUuid7.ToDateTime()
        };
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = AuthOptions.GetSymmetricSecurityKey();

        var token = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return token;
    }
}

