using Microsoft.EntityFrameworkCore;
using RPBooking.Features.Bookings;
using RPBooking.Features.Events;
using RPBooking.Features.Identity;
using static RPBooking.Features.Events.Event;

namespace RPBooking.Infrastructure.Persistence
{
    public static class AppDbContextSeed
    {
        public static async Task SeedAsync(AppDbContext AppContext, UserDbContext UserContext)
        {
            //Ensure Migrations are applied automatically
            await AppContext.Database.MigrateAsync();
            await UserContext.Database.MigrateAsync();

            //Only seed if events are missing
            if (await AppContext.Events.AnyAsync())
            {
                return;
            }

            //Seed initial baseline data
            await SeedDataAsync(AppContext, UserContext);

        }
        //Seed data
        public static async Task SeedDataAsync(AppDbContext AppContext, UserDbContext UserContext)
        {
            var ellen = new User
            {                
                Name = "Ellen",
                PasswordHash = "ABC1234",
                Age = 31,
                Email = "Ellen@gmail.com",
                Phone = "12223311",
                Role = User.UserRole.User

            };

            await UserContext.AddAsync(ellen);
            await UserContext.SaveChangesAsync();
            
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
                    UserId = ellen.Id,
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
                    Address = "Odensevej 41",
                    City = "Odense",
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
                    Address = "Odensevej 41",
                    City = "Odense",
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

            await AppContext.Events.AddRangeAsync(sampleEvents);
            await AppContext.SaveChangesAsync();
        }
    }
}
