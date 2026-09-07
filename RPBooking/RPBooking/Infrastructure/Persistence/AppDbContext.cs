using Microsoft.EntityFrameworkCore;
using RPBooking.Features.Bookings;
using RPBooking.Features.Events;

namespace RPBooking.Infrastructure.Persistence
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Event> Events => Set<Event>();
        public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<Participant> Participants => Set<Participant>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Setting custom rules for tables
            modelBuilder.Entity<Event>(builder =>
            {
                builder.HasKey(e => e.Id);

                builder.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(200);

                builder.Property(e => e.Description)
                .HasMaxLength(2000);
            });
        }
    }
}
