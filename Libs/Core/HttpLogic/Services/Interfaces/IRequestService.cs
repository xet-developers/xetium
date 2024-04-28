using ExampleCore.HttpLogic.Services;

namespace CoreLib.HttpServiceV2.Services.Interfaces;

/// <summary>
/// Отправка HTTP запросов и обработка ответов
/// </summary>
public interface IRequestService
{
    /// <summary>
    /// Отправить HTTP-запрос
    /// </summary>
    Task<HttpResponse<TResponse>> SendRequestAsync<TResponse, TRequest>(RequestData requestData,
        HttpConnectionData connectionData = default)
        where TRequest : class
        where TResponse : class;
}