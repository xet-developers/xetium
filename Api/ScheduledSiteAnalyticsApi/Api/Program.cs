using Api;
using Core.Filter;
using ExampleCore.AuthOptions;
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
builder.Services.AddAuth();
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

app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();
app.UseHangfireDashboard();


app.Run();