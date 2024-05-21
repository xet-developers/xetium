using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot(builder.Configuration);
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    
    app.UseDeveloperExceptionPage();
}

app.UseOcelot().Wait();
app.Run();