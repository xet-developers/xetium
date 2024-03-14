using System.Xml;
using System.Xml.Linq;
using HtmlAgilityPack;
using Medo;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Service;

public class AnalysisService : IAnalysisService
{
    private const string ApiUrl = "https://yandex.ru/search/xml/";
    private const string YandexApiKey = "AQVN2WKYnCn8f-vhljFQjlOU1vo-_4AMDfp3JItn";
    private const string FolderId = "b1gnogno2l3gvm4bj8cg";

    private Dictionary<SearchSystem, Func<AnalysisData, HttpClient, string, Task<int>>> _methods;
    private IAnalyticsRepository _analyticsRepository;
    private IProjectRepository _projectRepository;
    public AnalysisService(IAnalyticsRepository analyticsRepository, IProjectRepository projectRepository)
    {
        _methods = new Dictionary<SearchSystem, Func<AnalysisData, HttpClient, string, Task<int>>>
                    {
                        { SearchSystem.Yandex, GetYandexPositionAsync },
                        { SearchSystem.Google, GetGooglePositionAsync }
                    };
        _analyticsRepository = analyticsRepository;
        _projectRepository = projectRepository;
    }

    public async Task<SearchesDto> GetPositionAsync(AnalysisData model, HttpClient client, Guid userId)
    {
        var project = await _projectRepository.GetProjectByIdAsync(model.ProjId);
        if (project is null || project.User.Id != userId)
        {
            return null;
        }

        var searchDal = new SearchDal()
        {
            SearchID = new Uuid7().ToGuid(),
            ProjID = project.ProjID,
            Date = DateTime.Now.ToUniversalTime(),
            Type = ((SearchSystem)model.SearchSystem).ToString(),
            Project = project,
            KeywordResults = new List<KeywordResultDal>()
        };
        var results = await AddSearchResults(model, client, searchDal);

        return results;
    }

    private async Task<SearchesDto> AddSearchResults(AnalysisData model, HttpClient client, SearchDal searchDal)
    {
        var result = new SearchesDto()
        {
            KeywordResults = new List<KeywordResultDto>()
        };
        if (!_methods.TryGetValue((SearchSystem)model.SearchSystem, out var method))
        {
            return null;
        }

        result.Type = ((SearchSystem)model.SearchSystem).ToString();
        
        foreach (var keyword in model.Keywords)
        {
            await Task.Delay(3000);
            var position = await method(model, client, keyword);

            var keywordResult = new KeywordResultDal
            {
                Position = position,
                Text = keyword,
                SearchDal = searchDal,
                KeywordID =  new Uuid7().ToGuid()
            };
            
            await _analyticsRepository.AddSearchInformation(keywordResult);

            result.KeywordResults.Add(new KeywordResultDto()
            {
                Keyword = new KeywordDto()
                {
                    Text = keyword
                },
                Position = position
            });
        }

        return result;
    }

    private static async Task<int> GetGooglePositionAsync(AnalysisData model, HttpClient client, string keyword)
    {
        var response = await client.GetAsync($"https://google.com/search?q={keyword}&num={model.Top}");
        var htmlContent = await response.Content.ReadAsStringAsync();
        var doc = new HtmlDocument();
        doc.LoadHtml(htmlContent);
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

    private static async Task<int> GetYandexPositionAsync(AnalysisData model, HttpClient client, string keyword)
    {
        var index = 1;
        var top = Math.Ceiling((double)model.Top / 10);
        for (var page = 0; page < top; page++)
        {
            var url = $"{ApiUrl}?folderid={FolderId}&apikey={YandexApiKey}&query={keyword}&page={page}";
            var response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                continue;
            }
            var result = await response.Content.ReadAsStringAsync();
            var xmlDocument = new XmlDocument();
            xmlDocument.LoadXml(result);

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

