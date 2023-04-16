using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;

var builder = WebApplication.CreateBuilder(args);

//require for using swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = "Server=containers-us-west-133.railway.app;Port=7001;Database=railway;Username=postgres;Password=gEww88IZU68fMSgpTKCm";
builder.Services.AddDbContext<SomethingDbCtx>(opt => opt.UseNpgsql(connectionString));

var app = builder.Build();

var squidMapGroup = app.MapGroup("/api/squids");
var squidEndpoints = new SquidEndpoints();
squidEndpoints.Configure(squidMapGroup);

var instrumentMapGroup = app.MapGroup("/api/instruments");
var instrumentEndpoints = new InstrumentEndpoints();
instrumentEndpoints.Configure(instrumentMapGroup);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.Run();
