using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Core.BasicRoles;
using Domain.Entities;
using ExampleCore.AuthOptions;
using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;

namespace Services.Services;

public class UserService : IUserService
{
    private UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;


    public UserService(UserManager<User> userManager,
        RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IdentityResult> RegisterUserAsync(User user, string password)
    {
        var createResult = await user.CreateAsync(_userManager, password);

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

    public async Task<JwtSecurityToken> LoginUserAsync(User userLogin, string password)
    {
        var user = await _userManager.FindByNameAsync(userLogin.UserName);
        if (user == null || !await _userManager.CheckPasswordAsync(user, password))
        {
            return null;
        }

        var userRoles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>()
        {
            new(ClaimTypes.Name, user.UserName),
            new("id", user.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(nameof(IdentityUser.SecurityStamp), user.SecurityStamp)
        };
        claims.AddRange(userRoles.Select(userRole =>
            new Claim(ClaimTypes.Role, userRole)));

        var token = GetToken(claims);
        return token;
    }

    public async Task<User> GetUserInfoAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user is null)
        {
            throw new Exception("User Not Found");
        }

        return user;
    }

    public async Task<Guid> CheckExistAsync(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user is null)
        {
            return Guid.Empty;
        }

        return user.Id;
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