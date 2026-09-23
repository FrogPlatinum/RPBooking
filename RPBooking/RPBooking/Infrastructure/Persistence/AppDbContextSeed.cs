using Microsoft.EntityFrameworkCore;
using RPBooking.Features.Bookings;
using RPBooking.Features.Events;
using static RPBooking.Features.Events.Event;

namespace RPBooking.Infrastructure.Persistence
{
    public static class AppDbContextSeed
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            //Ensure Migrations are applied automatically
            await context.Database.MigrateAsync();

            //Only seed if events are missing
            if (await context.Events.AnyAsync())
            {
                return;
            }

            //Seed initial baseline data
            await SeedDataAsync(context);

        }
        //Seed data
        public static async Task SeedDataAsync(AppDbContext context)
        {
            var sampleParticipants = new List<Participant>
            {
                new() { Name = "Tom", Age = 33 },
                new() { Name = "Amalie", Age = 32 },
                new() { Name = "Kim", Age = 38 },
                new() { Name = "Helle", Age = 36}
            };

            var sampleBooking = new List<Booking>
            {
                new()
                {
                    ContactName = "Tom",
                    ContactEmail = "Tom@Test.com",
                    PhoneNumber = "12345678",
                    Note = "Looking forward to it",
                    Participants = sampleParticipants
                }
            };


            var sampleEvents = new List<Event>
            {
                new()
                {
                    Title = "D&D 5e: One-Shot Campaign",
                    Description = "An immersive tabletop roleplaying session for beginner to intermediate adventurers.",
                    Date = DateTime.UtcNow.AddDays(7),
                    AgeRes = 18,
                    Price = 150.00,
                    MinParticipant = 3,
                    MaxParticipant = 6,
                    PrivateEvent = false,
                    Bookings = sampleBooking,
                    Status = EventStatus.Scheduled,
                    Type = EventType.TabletopRP
                },

                new()
                {
                    Title = "Mothership One-Shot",
                    Description = "The mining colony in Ypsilon 14 has gone silent..",
                    Date= DateTime.UtcNow.AddDays(14),
                    AgeRes = 18,
                    Price = 200.00,
                    MinParticipant = 3,
                    MaxParticipant = 6,
                    PrivateEvent = true,
                    Bookings = new List<Booking>(),
                    Status = EventStatus.Scheduled,
                    Type = EventType.TabletopRP
                }
            };

            await context.Events.AddRangeAsync(sampleEvents);
            await context.SaveChangesAsync();
        }
    }
}
