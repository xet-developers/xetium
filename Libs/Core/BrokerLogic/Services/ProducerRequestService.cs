using System.Net;
using CoreLib.HttpServiceV2.Services.Interfaces;
using ExampleCore.HttpLogic.Services;
using ExampleCore.TraceLogic.Interfaces;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ExampleCore.BrokerLogic.Services;

public class ProducerRequestService: IRequestService
{
    private readonly IEnumerable<ITraceWriter> _traceWriterList;
    private readonly IClientFactory _clientFactory;
    public ProducerRequestService( IEnumerable<ITraceWriter> traceWriterList, IClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
        _traceWriterList = traceWriterList;
    }

    public async Task<HttpResponse<TResponse>> SendRequestAsync<TResponse, TRequest>(RequestData requestData,
        HttpConnectionData connectionData = default) where TRequest : class
        where TResponse : class
    {
        if (requestData.Body is not TRequest message)
        {
            throw new InvalidDataException();
        }

        var client = _clientFactory.CreateRequestClient<TRequest>();
        
        var res = await SendRequestToBrokerAsync<TResponse, TRequest>(client, message);
        return res;

    }

    private async Task<HttpResponse<TResponse>> SendRequestToBrokerAsync<TResponse, TRequest>(IRequestClient<TRequest> client, TRequest message)
        where TRequest : class where TResponse : class
    {
        try
        {
            var response = await client.GetResponse<TResponse>(message, callback: (configurator =>
                configurator.UseExecute(c =>
                {
                    foreach (var traceWriter in _traceWriterList)
                    {
                        c.Headers.Set(traceWriter.Name, traceWriter.GetValue());
                    }
                })));

            return new HttpResponse<TResponse>
            {
                Body = response.Message,
                StatusCode = HttpStatusCode.OK
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return new HttpResponse<TResponse>
            {
                Body = default, 
                StatusCode = HttpStatusCode.InternalServerError 
            };
        }
    }
}