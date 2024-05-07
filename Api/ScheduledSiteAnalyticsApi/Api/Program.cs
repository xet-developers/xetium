using Hangfire;
using Newtonsoft.Json;
using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.TryAddServices();
builder.Services.TryAddInfrastucture(builder.Configuration);
GlobalConfiguration.Configuration.UseSerializerSettings(new JsonSerializerSettings
{
    TypeNameHandling = TypeNameHandling.Auto
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseHangfireDashboard();

app.Run();