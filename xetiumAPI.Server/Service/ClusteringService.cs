using System.Text;
using Medo;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Polly;
using xetiumAPI.Interfaces;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Service;

public class ClusteringService : IClusteringService
{
    private static readonly string FolderId = "b1gnogno2l3gvm4bj8cg";
    private static readonly string ApiKey = "Api-Key AQVN2WKYnCn8f-vhljFQjlOU1vo-_4AMDfp3JItn";
    private readonly HttpClient _httpClient;

    public ClusteringService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    public async Task<FileStream> GetClusterQueriesUsingAiAsync(string query)         
    {
           _httpClient.DefaultRequestHeaders.Add("x-folder-id", FolderId);
           _httpClient.DefaultRequestHeaders.Add("Authorization", ApiKey);
           _httpClient.DefaultRequestHeaders.Add("x-data-logging-enabled", false.ToString());

        var data = new
           {
               modelUri = "gpt://b1gnogno2l3gvm4bj8cg/yandexgpt",
               completionOptions = new
               {
                   stream = false,
                   temperature = 0.5,
                   maxTokens = "1000"
               },
               messages = new object[]
               {
                    new { role = "system", text = "Твоя роль заключается в том, что ты кластеризируешь поисковые запросы по интенту, надо определить интент поисковых запросов из списка и разбить их по категориям: коммерческий(Коммерческий интент: запросы, которые выражают желание пользователя купить что-то или сравнить цены, характеристики, отзывы и т.д. ), информационный(Информационный интент: запросы, которые выражают потребность пользователя в получении информации о чем-то или узнать ответ на вопрос.), навигационный(Навигационный интент: запросы, которые выражают намерение пользователя перейти на определенный сайт или страницу.),транзакционный(Транзакционный интент: запросы, которые выражают желание пользователя выполнить какое-то действие на сайте или в приложении) и если запрос не подходит ни под одну категорию, вывести его отдельно с заголовком “Не получилось разбить”. Есть определенные правила  СВОИ КОМЕНТАРИИ ПИСАТЬ ЗАПРЕЩЕНО, СВОИ СЛОВА ПРИДУМЫВАТЬ ЗАПРЕЩЕНО.  Не изменять слова в запросах, НЕ ДОБАВЛЯЙ СВОИ КЛЮЧЕВЫЕ ФРАЗЫ, СВОИ КОМЕНТАРИИ В ОТВЕТ НЕ ВСТАВЛЯЙ ." },
                    new { role = "user", text = $"Ключевые фразы которые нужно рассмотреть: {query}" }
               }
           };

           var json = JsonConvert.SerializeObject(data);
           var content = new StringContent(json, Encoding.UTF8, "application/json");

           var response = await _httpClient.PostAsync("https://llm.api.cloud.yandex.net/foundationModels/v1/completionAsync", content);
           var responseBody = await response.Content.ReadAsStringAsync();
           

           var jsonData = JObject.Parse(responseBody);
           var operationId = jsonData["id"]?.ToString();
            
           var retryPolicy = Policy<JObject>
               .Handle<Exception>()
               .OrResult(result => result == null || !result["done"].ToObject<bool>())
               .WaitAndRetryAsync(30, retryAttempt => TimeSpan.FromSeconds(1));

           var operationResponse = await retryPolicy.ExecuteAsync(async () =>
           {
               var response = await _httpClient.GetAsync($"https://llm.api.cloud.yandex.net/operations/{operationId}");
               var responseBody = await response.Content.ReadAsStringAsync();

               var jsonData = JObject.Parse(responseBody);
               var done = jsonData["done"]!.ToObject<bool>();

               return done ? jsonData : null;
           });

           if (operationResponse is null)
           {
               return null;
           }
           
           var textFileName = new Uuid7().ToString();

           using (StreamWriter sw = new StreamWriter($"{Directory.GetCurrentDirectory()}{textFileName}.txt", true))
           {
               sw.WriteLine(operationResponse["response"]["alternatives"][0]["message"]["text"].ToString());
           }

           var fs = File.Open($"{Directory.GetCurrentDirectory()}{textFileName}.txt", FileMode.Open);
           return await Task.FromResult(fs);
    }
}