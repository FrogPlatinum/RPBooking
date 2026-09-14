using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;
using Xunit;

namespace RPBooking.Features.Events.GetEventById
{
    public class GetEventByIdTests
    {
        private readonly SqliteConnection _connection;
        private readonly AppDbContext _context;

        public GetEventByIdTests()
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
        public async Task ReturnEventById()
        {
            //Arrange
            var seedEvent = new List<Event>
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
                }
            };

            await _context.Events.AddRangeAsync(seedEvent);
            await _context.SaveChangesAsync();

            var handler = new GetEventById.Handler(_context);
            var query = new GetEventById.Query(1);

            //Act
            var result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Contains(result.Title, "Call of Cthulhu Session");
        }
    }
}
