using System.Text;
using Domain.Entity;
using Domain.Interfaces;
using Medo;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Polly;
using Service.Interfaces;

namespace Service.Services
{
    public class AiGenerationService : IAiGenerationService
    {
        private readonly IYandexGptConnection _yandexGptConnection;
        public AiGenerationService(IYandexGptConnection yandexGptConnection)
        {
            _yandexGptConnection = yandexGptConnection;
        }
        public async Task<FileStream> GetClusterQueriesUsingAiAsync(string query)
        {
            var res = await _yandexGptConnection.GetClusterQueriesAsync(query);
            
            if (res is null)
            {
                return null;
            }

            var textFileName = new Uuid7().ToString();

            using (StreamWriter sw = new StreamWriter($"{Directory.GetCurrentDirectory()}{textFileName}.txt", true))
            {
                sw.WriteLine(res);
            }

            var fs = File.Open($"{Directory.GetCurrentDirectory()}{textFileName}.txt", FileMode.Open);
            return await Task.FromResult(fs);
        }

        public async Task<string> GetAutoQueryGeneration(Query query)
        {
            var res = await _yandexGptConnection.GetAutoQueryGeneration(query);
            
            return res;
        }
    }
}
