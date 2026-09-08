using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
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

            //Only seed if any table is missing
            if (await context.Events.AnyAsync() || await context.Bookings.AnyAsync() || await context.Participants.AnyAsync())
            {
                return;
            }

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
                    Type = EventType.TabletopRPGroup
                }
            };

            await context.Events.AddRangeAsync(sampleEvents);
            await context.SaveChangesAsync();
        }
    }
}
