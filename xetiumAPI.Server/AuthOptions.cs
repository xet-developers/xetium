using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace xetiumAPI.ServerApp;

public static class AuthOptions
{
    public const string ISSUER = "XetApi"; 
    public const string AUDIENCE = "XetUser"; 
    const string KEY = @"
                       ░░░░░░░░░░░░░░░░░░░░
                       ░░░░░ЗАПУСКАЕМ░░░░░░░
                       ░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░
                       ▄███▀░◐░░░▌░░░░░░░░░
                       ░░░░▌░░░░░▐░░░░░░░░░
                       ░░░░▐░░░░░▐░░░░░░░░░
                       ░░░░▌░░░░░▐▄▄░░░░░░░
                       ░░░░▌░░░░▄▀▒▒▀▀▀▀▄
                       ░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄
                       ░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄
                       ░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄
                       ░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄
                       ░░░░░░░░░░░▌▌░▌▌░░░░░
                       ░░░░░░░░░░░▌▌░▌▌░░░░░
                       ░░░░░░░░░▄▄▌▌▄▌▌░░░░░"; 

    public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new (Encoding.UTF8.GetBytes(KEY));
}
