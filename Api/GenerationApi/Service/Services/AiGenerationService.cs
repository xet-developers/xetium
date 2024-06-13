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
        private readonly Dictionary<string, IntentType> _intets = new()
        {
            {"Сравнительный", IntentType.Comparison},
            { "Информационный", IntentType.Informational},
            {"Навигационный",IntentType.Navigation},
            {"Транзакционный", IntentType.Transactional},
        };
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

        public async Task<Intents> GetAutoQueryGeneration(Query query)
        {
            var res = await _yandexGptConnection.GetAutoQueryGeneration(query);

            if (res is null)
            {
                return null;
            }
            var parsedIntents = ParseIntents(res);
            var generatedIntets = GenerateIntets(parsedIntents, query.Intent);
            
            return generatedIntets;
        }



        private Intents GenerateIntets(Dictionary<IntentType, List<string>> parsedIntents, IntentType intentType)
        {
            var intents = new Intents();

            if (intentType == IntentType.All)
            {
                if (parsedIntents.TryGetValue(IntentType.Comparison, out List<string>? comparisonValue))
                    intents.Comparison = comparisonValue;
                if (parsedIntents.TryGetValue(IntentType.Informational, out List<string>? informationalValue))
                    intents.Informational = informationalValue;
                if (parsedIntents.TryGetValue(IntentType.Navigation, out List<string>? navigationalValue))
                    intents.Navigational = navigationalValue;
                if (parsedIntents.TryGetValue(IntentType.Transactional, out List<string>? transactionalValue))
                    intents.Transactional = transactionalValue;

                return intents;
            }

            if (!parsedIntents.TryGetValue(intentType, out List<string>? value))
            {
                return intents;
            }
            
            switch (intentType)
            {
                case IntentType.Comparison:
                    intents.Comparison = value;
                    break;
                case IntentType.Informational:
                    intents.Informational = value;
                    break;
                case IntentType.Navigation:
                    intents.Navigational = value;
                    break;
                case IntentType.Transactional:
                    intents.Transactional = value;
                    break;
                default:
                    return intents;
            }

            return intents;
        }
        private Dictionary<IntentType, List<string>> ParseIntents(string input)
        {
            var intents = new Dictionary<IntentType, List<string>>();
            var segments = input.Split('|');

            foreach (var segment in segments)
            {
                var parts = segment.Split(new[] { ": " }, StringSplitOptions.None);
                if (parts.Length == 2)
                {
                    var intent = parts[0].Trim();
                    var queries = parts[1].Split(new[] { ", " }, StringSplitOptions.None);
                    intents[_intets[intent]] = new List<string>(queries);
                }
            }

            return intents;
        }
    }
}

public class Intents
{
    public List<string> Comparison { get; set; } = new List<string>();
    public List<string> Informational { get; set; } = new List<string>();
    public List<string> Navigational { get; set; } = new List<string>();
    public List<string> Transactional { get; set; } = new List<string>();
    
}