using Api;
using Api.Controllers.Response.Consumer;
using MassTransit;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.TryAddServices();
builder.Services.TryAddInfrastructure();
builder.Services.AddControllers();
builder.Services.AddBroker();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
