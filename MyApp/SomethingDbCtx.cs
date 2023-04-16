using Microsoft.EntityFrameworkCore;
class SomethingDbCtx : DbContext
{
    public SomethingDbCtx(DbContextOptions<SomethingDbCtx> options) : base(options) { }
    public DbSet<Squid> Squids => Set<Squid>();
    public DbSet<Instrument> Instruments => Set<Instrument>();
}