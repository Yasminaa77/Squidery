using Microsoft.EntityFrameworkCore;

class InstrumentEndpoints
{
    public void Configure(RouteGroupBuilder router)
    {
        router.MapGet("/", GetInstruments);
        router.MapPost("/", CreateInstrument);

        router.MapPut(
            "/{id}",
            async (SomethingDbCtx db, int id, Instrument instrument) =>
            {
                if (id != instrument.Id)
                {
                    return Results.BadRequest();
                }
                db.Entry(instrument).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
        );
        router.MapDelete(
            "/{id}",
            async (SomethingDbCtx db, int id) =>
            {
                var instrument = await db.Instruments.FindAsync(id);
                if (instrument == null)
                {
                    return Results.NotFound();
                }
                db.Instruments.Remove(instrument);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
        );
    }

  Task<List<Instrument>> GetInstruments(SomethingDbCtx db)
{
    // return db.Instruments.ToListAsync();

    var instruments = db.Instruments.Include(t => t.Squid).Select(t => new Instrument
    {
        Id = t.Id,
        Name = t.Name,
        Type = t.Type,
        Color = t.Color,
        SquidId = t.SquidId,
        Squid = new Squid
        {
            Id = t.Squid.Id,
            Name = t.Squid.Name,

        }
    }).ToListAsync();
    // Console.WriteLine($"Instruments: {string.Join(", ", instruments.Result)}"); // Add this line

    return instruments;
}

    async Task<IResult> CreateInstrument(SomethingDbCtx db, Instrument instrument)
    {
        db.Instruments.Add(instrument);
        await db.SaveChangesAsync();
        return Results.Created($"/api/instruments/{instrument.Id}", instrument);
    }
}
