using Domain.Entity;
using HtmlAgilityPack;
using System.Xml;

namespace Domain.Interfaces
{
    public interface ISiteInfo
    {
        public Task<HtmlDocument> GetGoogleInfoAsync(SearchInfo model, string keyword);
        public Task<XmlDocument> GetYandexInfoAsync(int page, string keyword);
    }
}
