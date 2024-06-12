using System.Text;
using Domain.Entity;
using Domain.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Polly;

namespace Infrastructure.Connection;

public class YandexGptConnection: IYandexGptConnection
{
    private static readonly string FolderId = "b1g0d2ifbbaarf6mkn2m";
    private static readonly string ApiKey = "Api-Key AQVN3CAag7T1wBhY38O-7ctH1ex5-_pjybJVOHQm";
    private readonly HttpClient _httpClient;
    private readonly Dictionary<IntentType, string> _intets = new()
    {
        { IntentType.Comparison, "Сравнительный" },
        { IntentType.Informational, "Информационный" },
        { IntentType.Navigation, "Навигационный" },
        { IntentType.Transactional, "Транзакционный" },
        { IntentType.All, "Сравнительный,Информационный,Навигационный,Транзакционный" }
    };

    public YandexGptConnection(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<string> GetClusterQueriesAsync(string query)
    {
        _httpClient.DefaultRequestHeaders.Add("x-folder-id", FolderId);
        _httpClient.DefaultRequestHeaders.Add("Authorization", ApiKey);
        _httpClient.DefaultRequestHeaders.Add("x-data-logging-enabled", false.ToString());
        
        var data = new
        {
            modelUri = "gpt://b1g0d2ifbbaarf6mkn2m/yandexgpt/latest",
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
        
        var res = await SenRequestAsync(data);
        
        return res;
    }

    private async Task<string> SenRequestAsync(object data)
    {
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

        return operationResponse["response"]["alternatives"][0]["message"]["text"].ToString();
    }

    public async Task<string> GetAutoQueryGeneration(Query query)
    {
        _httpClient.DefaultRequestHeaders.Add("x-folder-id", FolderId);
        _httpClient.DefaultRequestHeaders.Add("Authorization", ApiKey);
        _httpClient.DefaultRequestHeaders.Add("x-data-logging-enabled", false.ToString());

        var data = new
        {
            modelUri = "gpt://b1g0d2ifbbaarf6mkn2m/yandexgpt/latest",
            completionOptions = new
            {
                stream = false,
                temperature = 0.8,
                maxTokens = "3000"
            },
            messages = new object[]
            {
                new { role = "system", text = $"Твоя роль заключается в том, что ты пишешь автогенерацию поисковых запросов по интенту коммерческий (Коммерческий интент: запросы, которые выражают желание пользователя купить что-то или сравнить цены, характеристики, отзывы и т.д.), информационный (Информационный интент: запросы, которые выражают потребность пользователя в получении информации о чем-то или узнать ответ на вопрос), навигационный (Навигационный интент: запросы, которые выражают намерение пользователя перейти на определенный сайт или страницу), транзакционный (Транзакционный интент: запросы, которые выражают желание пользователя выполнить какое-то действие на сайте или в приложении).\nСгенерируй  {query.NumberOfGeneratedWords} запросов по следующим параметрам, соблюдая равное количество запросов для каждого интента.Генерируй строго в таком формате на примере утюг и 10 слов, интента сравнительный.\n1. Какой утюг лучше купить?\n2. Сравнение утюгов разных производителей.\n3. Отзывы об утюгах.\n4. Где купить хороший утюг?\n5. Как выбрать утюг для дома?\n6. Утюги с парогенератором: плюсы и минусы.\n7. Рейтинг утюгов.\n8. Обзор современных моделей утюгов.\n9. Какие характеристики важны при выборе утюга?\n10. Стоимость утюгов в разных магазинах.\n " },
                new { role = "user", text = $"Слова, которые нужно рассмотреть: {query.Keywords} по интенту {_intets[query.Intent]} "  }
            }
        };
            
        var res = await SenRequestAsync(data);
        
        return res;
    }
}