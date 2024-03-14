using System.IdentityModel.Tokens.Jwt;

namespace xetiumAPI.ServerApp.Extentions;

public static class StringExtention
{
    public static JwtSecurityToken ParseJWT(this string jwt)
    {
        var token = jwt.Substring("Bearer ".Length).Trim();
        var handler = new JwtSecurityTokenHandler();
        return handler.ReadJwtToken(token);
    }
}
