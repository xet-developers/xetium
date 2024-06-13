using System.Text;
using Domain.Entity;
using Domain.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Polly;

namespace Infrastructure.Connection;

public class YandexGptConnection: IYandexGptConnection
{
    private static string AccesToken = "eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.woXQu-GtzUjTl-lELn-LID0-DT-SGnVZzxG-KIqXo0_JrtcTgqZagvuwH_Qz029LuzUIGxm6r6WqKTL8_h_GqTxoksQ4xaljUikc-Pr-OweTQvCaLMlcl187uG3OHH5C57JrFW8qmne8gX7c4CnJiB-KPu9MjJzjNKSSRiB_gB97YJ4TFLuLMXlJGWIoTjmYQburUfQSlKlyckXq-t1Of1-KWZ0SIDRET_jprHbsngbAUCcsUaBEYYq0CXaCpK1JXm0iwIv6bicitZ9UdHvgIrA2DUT57sJM0Y-cnv3PBWv6hzNj1fFgzbglnRMQzJf6_v0v1rZcw92lintHlROFww.Mnzjy05oaxsIOuz9cFMRwA.ZlMTlaVxatlp5b5KF7U6P_2g6uEgVZHtXe3ponMwaDkAm3Rv0x7uQnjS3HDe1SWNYh5wltqUqhJ0veKUNUaqXOd5frVAI5iv1YhKqajMWfZkXr7yIVLmrl4M2RwsUdZj7Ga8Uw11BfLU4ZaW62j6f17u_GUgP5ewr9q1TitZUO0FkSmomHnVnE1BQM1oU5dtv1Fg2HtknfTwL5mNWpIjO27sDEDsv9QGxq19ZlfxvRlPni4AXr_bBnmnOpFQs9oNUOK6YiZmfsUFTYKkPvJdXVrV6sBucUM3cK09VvVzzz11FaNVXeTO5Hb0BXlpFEY0z1Uw0VJQJVg-3T-zElORkyacvORea_iWBn_X-y1MYUmy4chf19TeSCtA_UfXcaVHf1uY3x77bRJ8FjM8kNIJIhKCosPGzDIoPEYBcrOoJ3fPkzsCf_ihxKOv7H3Soo0yoEvaA0zb73590k9XkK9jD4baiyyyLKY85lRAioXqjSD2ZVqE8bmdbiWVZp4n9DhZha_vw0_37jjcIG85xt4AI0F9zDTbKht1xcJ-Z5uSBRF5jhLtdZQBKENyDltDfjJzuLwvUy9vHSQQV44PdF5N5I6FyLk3BiSLOmkR6n6XgiCL5AXm5g_lAerh1A1piDHqtagJqDy8LpqAM8CjmqH3x5N9W5ymybuHdHWBffirxNQpuMb1AgL7GIvGjT2mIEHn232g90kmtMBUJZGF0HuScUMBUQ-ORIMHuTTp-LnS4vc.CoytRyL6RltKoCOfVvkp48WJLPxxwXHp5m7oFqGaSqo";
    private static readonly string FolderId = "b1g0d2ifbbaarf6mkn2m";
    private static readonly string ApiKey = "Api-Key AQVN3CAag7T1wBhY38O-7ctH1ex5-_pjybJVOHQm";
    private HttpClient _httpClient;
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
        HttpClientHandler handler = new HttpClientHandler();
        handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

        _httpClient = new HttpClient(handler);
        
        _httpClient.DefaultRequestHeaders.Remove("Authorization");
        _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {AccesToken}");
        
        var data = new
        {
            model = "GigaChat-Pro",
            messages = new object[]
            {
                new { role = "system", content = "Твоя роль заключается в том, что ты занимаешься автогенерацией запросов по интенту. Вот какие есть интенты:\n\nСравнительный: запросы, которые выражают желание пользователя сравнить что-то, например, цены, характеристики, отзывы и т.д.\nИнформационный: запросы, которые выражают потребность пользователя в получении информации о чем-то или узнать ответ на вопрос.\nНавигационный: запросы, которые выражают намерение пользователя перейти на определенный сайт или страницу.\nТранзакционный: запросы, которые выражают желание пользователя выполнить какое-то действие на сайте или в приложении.\n\nЕсть определенные правила, которым ты обязан следовать:\n\n    Ты должен это написать в формате, чтобы автоматически можно было спарсить, то есть ты пишешь название интента и потом после двоеточия слова, и когда напишешь нужное количество слов, оканчиваешь этим символом “|”.\n    Генерируй запросы исключительно по словам, указанным пользователем.\n    Если количество слов для каждого интента указано, ты должен генерировать именно столько слов, сколько указано. Если слов несколько, то делай равное количество для каждого интента.\n    Все запросы должны быть уникальными и логичными.\n    Избегай повторений и следи за тем, чтобы запросы были осмысленными и соответствовали интенту.\n\nПример:\nПользователь указывает слово \"утюг\" и просит сгенерировать 10 слов для каждого интента. Ты генерируешь 10 уникальных запросов для каждого из следующих интентов, связанных только с утюгом:\n\nСравнительный: сравнить цены на утюги, сравнить характеристики утюгов, отзывы на утюги, лучшие утюги, утюги рейтинг, утюги топ, утюги дешевые, утюги дорогие, утюги отзывы, сравнить модели утюгов|\nИнформационный: как выбрать утюг, как почистить утюг, как пользоваться утюгом, история утюга, устройство утюга, виды утюгов, лучшие утюги для дома, как исправить утюг, безопасное использование утюга, советы по уходу за утюгом|\nНавигационный: зайти на сайт утюгов, открыть страницу утюгов на Wikipedia, перейти на форум о бытовой технике, найти отзывы на утюги, перейти в блог о домашних гаджетах, найти магазин утюгов, открыть страницу с рейтингами утюгов, найти инструкции к утюгам, открыть видеообзоры утюгов, найти советы по выбору утюга|\nТранзакционный: купить утюг онлайн, зарегистрироваться на сайте для покупки утюга, заказать утюг с доставкой, оплатить утюг через интернет, оставить отзыв о покупке утюга, вернуть утюг по гарантии, подписаться на рассылку о скидках на утюги, скачать инструкцию к утюгу, обменять утюг на новый, продать утюг|\n\nСгенерируй запросы для всех интентов в указанном формате, основываясь только на словах, которые указал пользователь."},
                new { role = "user", content = $" Мне нужно, чтобы ты автосгенрировала запрос для этих слов : {query.Keywords}\n Количество запросов которые ты должен сгенерить : {query.NumberOfGeneratedWords}\n"}
            },
            n =  1,
            stream = false,
            max_tokens =  1024,
            repetition_penalty =  1,
            update_interval =  0
        };
        var json = JsonConvert.SerializeObject(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var retryPolicy = Policy
            .HandleResult<HttpResponseMessage>(r => r.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            .RetryAsync(3, async (response, retryCount, context) =>
            {
                await GetAuthToken();
                _httpClient.DefaultRequestHeaders.Remove("Authorization");
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {AccesToken}");
            });
        
        var response = await retryPolicy.ExecuteAsync(async () =>
        {
            return await _httpClient.PostAsync("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", content);
        });
        var responseContent = await response.Content.ReadAsStringAsync();
        var jsonData = JObject.Parse(responseContent);
        var token = jsonData.SelectToken("choices[0].message.content", errorWhenNoMatch: false);

        if (token is null)
        {
            return "";
        }

        var res = token.ToString();
        return res;

    }
    private async Task<bool> GetAuthToken()
    {
        _httpClient.DefaultRequestHeaders.Remove("Authorization");

        
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Basic ZGZiNTYwOTUtMDBiYi00NjM5LWI3ZTgtZjQ1YzI5NGQwOGFiOmM3ZjUzZTMzLWZlNTYtNDU5Yy05MDFmLTNiNzZjM2RjNWJmMw==");
        _httpClient.DefaultRequestHeaders.Add("RqUID", Guid.NewGuid().ToString());
        
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("scope", "GIGACHAT_API_PERS")
        });
        
        var retryPolicy = Policy<JObject>
            .Handle<Exception>()
            .OrResult(result => result == null || !result.ContainsKey("access_token"))
            .WaitAndRetryAsync(30, retryAttempt => TimeSpan.FromSeconds(1));
        
        var operationResponse = await retryPolicy.ExecuteAsync(async () =>
        {
            var response = await _httpClient.PostAsync("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            var jsonData = JObject.Parse(responseBody);
            var done = jsonData.TryGetValue("code", out _);

            return done ? null : jsonData;
        });
        
        
        if (operationResponse is null || operationResponse.ContainsKey("code") || !operationResponse.ContainsKey("access_token"))
        {
            return false;
        }
        
        AccesToken = operationResponse["access_token"].ToString();
        
        _httpClient.DefaultRequestHeaders.Remove("RqUID");
        
        return true;
    }


}