using System.Net;
using System.Net.Security;
using ExampleCore.BrokerLogic;
using ExampleCore.HttpLogic;
using ExampleCore.Swagger;
using Infrastructure.Connection;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.TryAddInfrastucture(builder.Configuration);
builder.Services.TryAddServices();
builder.Services.AddAuthorization();
builder.Services.AddSwaggerStartUpBase();
builder.Services.AddHttpRequestService();



builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("xetium-rabbitmq-service", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });
    });
            
});

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();
app.MapControllers();
app.Run();
