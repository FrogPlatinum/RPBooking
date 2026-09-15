using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;
using Xunit;
using System.Linq;

namespace RPBooking.Features.Events.GetEvents
{
    public class GetEventsTests
    {
        private readonly SqliteConnection _connection;
        private readonly AppDbContext _context;

        //Setting up Db
        public GetEventsTests()
        {
            _connection = new SqliteConnection("Filename=:memory:");
            _connection.Open();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(_connection)
                .Options;

            _context = new AppDbContext(options);
            _context.Database.EnsureCreated();
        }

        [Fact]
        public async Task ReturnAllEventsFromDb()
        {
            //Arrange
            var seedEvents = new List<Event>
            {
                new Event
                {
                    Title = "Call of Cthulhu Session",
                    Description = "Horror tabletop night",
                    Date = DateTime.UtcNow.AddDays(7),
                    AgeRes = 16,
                    Price = 50,
                    MinParticipant = 3,
                    MaxParticipant = 6,
                    PrivateEvent = false,
                    Type = Event.EventType.TabletopRP,
                    Status = Event.EventStatus.Scheduled
                },
                new Event
                {
                    Title = "Cyberpunk RED One-Shot",
                    Description = "High-tech low-life RPG",
                    Date = DateTime.UtcNow.AddDays(10),
                    AgeRes = 18,
                    Price = 75,
                    MinParticipant = 4,
                    MaxParticipant = 5,
                    PrivateEvent = true,
                    Type = Event.EventType.TabletopRP,
                    Status = Event.EventStatus.Scheduled
                }
            };

            await _context.Events.AddRangeAsync(seedEvents);
            await _context.SaveChangesAsync();

            var handler = new GetEvents.Handler(_context);
            var query = new GetEvents.Query();

            //Act
            var result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Events);
            Assert.Equal(2, result.Events.Count());
            Assert.Contains(result.Events, e => e.Title == "Call of Cthulhu Session");
            Assert.Contains(result.Events, e => e.Title == "Cyberpunk RED One-Shot");
        }
    }
}
