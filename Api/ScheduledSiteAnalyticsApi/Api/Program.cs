using Api;
using Core.Filter;
using ExampleCore.Swagger;
using Hangfire;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerStartUpBase();
builder.Services.AddControllers(options =>
{
    options.Filters.Add<UserIdFilter>();
});
builder.Services.TryAddServices();
builder.Services.TryAddInfrastucture(builder.Configuration);
builder.Services.AddBroker();
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseHangfireDashboard();


app.Run();