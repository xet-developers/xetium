using System.Net;
using System.Net.Security;
using ExampleCore.BrokerLogic;
using ExampleCore.HttpLogic;
using ExampleCore.Swagger;
using Infrastructure;
using Infrastructure.Connection;
using MassTransit;
using Microsoft.EntityFrameworkCore;

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
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();
app.MapControllers();
app.Run();
