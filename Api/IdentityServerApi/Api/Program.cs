using ExampleCore.Swagger;
using IdentityServerApi.Controllers.User;
using Infrastucture;
using MassTransit;
using MassTransit.MultiBus;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.AddSwaggerStartUpBase();
builder.Services.TryAddServices();
builder.Services.TryAddInfrastucture(builder.Configuration);
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<CheckUserExistConsumer>();
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
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContex>();
    await context.Database.MigrateAsync();
}

app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();


app.Run();