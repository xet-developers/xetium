var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.TryAddInfrastucture();
builder.Services.TryAddServices();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();
app.MapControllers();
app.Run();
