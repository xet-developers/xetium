using System.Text;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Domain.Entity;
using Domain.Interfaces;
using Medo;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Polly;
using Service.Interfaces;
using Query = Domain.Entity.Query;

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

            var docFileName = $"{Directory.GetCurrentDirectory()}/GenerationSave/{new Uuid7()}.docx";

            using (var wordDocument = WordprocessingDocument.Create(docFileName, DocumentFormat.OpenXml.WordprocessingDocumentType.Document))
            {
                var mainPart = wordDocument.AddMainDocumentPart();
                mainPart.Document = new Document();
                var body = mainPart.Document.AppendChild(new Body());
                var para = body.AppendChild(new Paragraph());
                var run = para.AppendChild(new Run());
                run.AppendChild(new Text(res));
            }

            var fs = File.Open(docFileName, FileMode.Open);
            return await Task.FromResult(fs);
        }

        public async Task<Intents> GetAutoQueryGeneration(Query query)
        {
            var res = await _yandexGptConnection.GetAutoQueryGeneration(query);
            
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
                
                intents.Status = true;
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
            
            intents.Status = true;
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