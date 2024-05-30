using Domain.Entity;
using Domain.Interfaces;
using Service.Interfaces;
using System.Xml;

namespace Service
{
    public class SitePositionService : ISitePositionService
    {
        private ISiteInfo _siteInfo;
        private Dictionary<SearchSystem, Func<SearchInfo, string, Task<int>>> _methods;

        public SitePositionService(ISiteInfo siteInfo)
        {
            _methods = new() {
                { SearchSystem.Google, GetGooglePositionAsync },
                { SearchSystem.Yandex, GetYandexPositionAsync}
            };
            _siteInfo = siteInfo;
        }

        public async Task<List<SearchResult>> GetPositionAsync(SearchInfo model)
        {
            var result = new List<SearchResult>();
            if (!_methods.TryGetValue((SearchSystem)model.SearchSystem, out var method))
            {
                return null;
            }

            foreach (var keyword in model.Keywords)
            {
                await Task.Delay(3000);
                var position = await method(model, keyword);

                var keywordResult = new SearchResult
                {
                    Date = DateTime.Now,
                    Keyword = keyword,
                    Position = position,
                    SearchSystem = model.SearchSystem
                };

                result.Add(keywordResult);
            }

            return result;
        }

        private async Task<int> GetGooglePositionAsync(SearchInfo model, string keyword)
        {
            var doc = await _siteInfo.GetGoogleInfoAsync(model, keyword);
            var searchResults = doc.DocumentNode.SelectNodes("//*[@id=\"main\"]/div/div/div/a/@href");

            if (searchResults is null)
            {
                throw new Exception("В данный момент сервис испытывает проблемы, попробуйте позже");
            }

            var index = 1;
            foreach (var searchResult in searchResults)
            {
                if (searchResult.Attributes["href"].Value.Contains(model.URI))
                {
                    return index;
                }
                index++;
            }

            return -1;

        }
        private async Task<int> GetYandexPositionAsync(SearchInfo model, string keyword)
        {
            var index = 1;
            var top = Math.Ceiling((double)model.Top / 10);
            for (var page = 0; page < top; page++)
            {
                var xmlDocument = await _siteInfo.GetYandexInfoAsync(page, keyword);

                var urls = xmlDocument.SelectNodes("//url");
                foreach (XmlNode urlNode in urls)
                {
                    var urlText = urlNode.InnerText;
                    if (urlText.Contains(model.URI))
                    {
                        return index;
                    }
                    index++;
                }
            }

            return -1;
        }
    }
}
