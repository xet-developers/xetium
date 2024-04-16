using ExampleCore.HttpLogic.Services;

namespace CoreLib.HttpServiceV2.Services.Interfaces;

/// <summary>
/// Отправка HTTP запросов и обработка ответов
/// </summary>
public interface IHttpRequestService
{
    /// <summary>
    /// Отправить HTTP-запрос
    /// </summary>
    Task<HttpResponse<TResponse>> SendRequestAsync<TResponse, TRequest>(HttpRequestData requestData,
        HttpConnectionData connectionData = default)
        where TRequest : class
        where TResponse : class;
}