using ExampleCore.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.TryAddInfrastucture();
builder.Services.TryAddServices();
builder.Services.AddAuthorization();
builder.Services.AddSwaggerStartUpBase();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();
app.MapControllers();
app.Run();
