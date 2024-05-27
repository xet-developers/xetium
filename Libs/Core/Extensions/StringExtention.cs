using System.IdentityModel.Tokens.Jwt;

namespace Core.Extensions;
public static class StringExtention
{
    public static JwtSecurityToken ParseJWT(this string jwt)
    {
        var token = jwt.Substring("Bearer ".Length).Trim();
        var handler = new JwtSecurityTokenHandler();
        return handler.ReadJwtToken(token);
    }
}
