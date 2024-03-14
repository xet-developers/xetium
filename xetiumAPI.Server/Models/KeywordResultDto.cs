using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Models;

public class KeywordResultDto
{
    public int Position { get; set; }

    public KeywordDto Keyword { get; set; }
}