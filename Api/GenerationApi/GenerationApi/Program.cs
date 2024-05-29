var builder = WebApplication.CreateBuilder(args);

builder.Services.TryAddInfrastucture();
builder.Services.TryAddServices();

var app = builder.Build();


app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.Run();
