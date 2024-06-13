﻿using Domain.Entity;

namespace Api.Controllers;

public record QueryRequest
{
    public string Keywords { get; set; }
    public int NumberOfGeneratedWords { get; set; }
    public IntentType Intents { get; set; }
}