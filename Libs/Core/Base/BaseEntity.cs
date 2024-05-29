using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ExampleCore.Dal.Base;

/// <summary>
/// Базовая сущность для работы с сущностями в бд
/// </summary>
/// <typeparam name="T">тип идентификатор</typeparam>
public record BaseEntity<T>
{
    /// <summary>
    /// уникальный идентфиикатор сущности
    /// </summary>
    public T Id { get;  set; }
}