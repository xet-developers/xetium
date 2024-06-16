﻿using Domain.Entity;
using Domain.Interfaces;
using HtmlAgilityPack;
using Medo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Infrastructure
{
    public class SiteInfo : ISiteInfo
    {
        private const string ApiUrl = "https://yandex.ru/search/xml/";
        private const string YandexApiKey = "AQVN3CAag7T1wBhY38O-7ctH1ex5-_pjybJVOHQm";
        private const string FolderId = "b1g0d2ifbbaarf6mkn2m";

        private HttpClient _httpClient;
        public SiteInfo(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HtmlDocument> GetGoogleInfoAsync(SearchInfo model, string keyword)
        {
            var response = await _httpClient.GetAsync($"https://google.com/search?q={keyword}&num={model.Top}");
            var htmlContent = await response.Content.ReadAsStringAsync();
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlContent);
            return doc;
        }

        public async Task<XmlDocument> GetYandexInfoAsync(int page, string keyword)
        {
            var url = $"{ApiUrl}?folderid={FolderId}&apikey={YandexApiKey}&query={keyword}&page={page}";
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            var result = await response.Content.ReadAsStringAsync();
            var xmlDocument = new XmlDocument();
            xmlDocument.LoadXml(result);

            return xmlDocument;
        }
    }
}