using Api;
using Api.Controllers.Response.Consumer;
using ExampleCore.Swagger;
using MassTransit;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerStartUpBase();
builder.Services.TryAddServices();
builder.Services.TryAddInfrastructure();
builder.Services.AddControllers();
builder.Services.AddBroker();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();
app.MapControllers();

app.Run();
