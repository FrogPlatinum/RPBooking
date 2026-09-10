using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;
using Xunit;

namespace RPBooking.Features.Events.CreateEvent
{
    public class CreateEventTests : IDisposable
    {
        private readonly SqliteConnection _conection;
        private readonly AppDbContext _context;

        //SQLite in-memory
        public CreateEventTests()
        {
            _conection = new SqliteConnection("Filename=:memory:");
            _conection.Open();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(_conection)
                .Options;

            _context = new AppDbContext(options);
            _context.Database.EnsureCreated();
        }

        //Test Method
        [Fact]
        public async Task AddEventAndReturnId()
        {
            //Arrange
            var handler = new CreateEvent.Handler(_context);

            var command = new CreateEvent.Command(
                Title: "Call of Cthulhu",
                Description: "Spooks and Horror",
                Date: DateTime.UtcNow.AddDays(14),
                AgeRes: 16,
                Price: 199,
                MinParticipant: 3,
                MaxParticipant: 6,
                PrivateEvent: false,
                Type: Event.EventType.TabletopRP,
                Status: Event.EventStatus.Scheduled
             );

            //Act
            int generatedId = await handler.Handle(command, CancellationToken.None);

            //Assert
            Assert.True(generatedId > 0 );
            var savedEvent = await _context.Events.FindAsync(generatedId);
            Assert.NotNull( savedEvent );
            Assert.Equal("Call of Cthulhu", savedEvent.Title);
        }

        //Dispose connections after use
        public void Dispose()
        {
            _context.Dispose();
            _context.Dispose();
        }
    }
}
