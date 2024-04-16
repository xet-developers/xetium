
using System.IdentityModel.Tokens.Jwt;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Services.Interfaces;

public interface IUserService
{
    public Task<IdentityResult> RegisterUserAsync(User user, string Password);
    public Task<JwtSecurityToken> LoginUserAsync(User userLogin, string password);

    public Task<User> GetUserInfoAsync(Guid userId);

    public Task<Guid> CheckExistAsync(Guid id);
}