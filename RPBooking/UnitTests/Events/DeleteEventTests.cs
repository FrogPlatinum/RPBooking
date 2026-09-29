using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RPBooking.Features.Events;
using RPBooking.Features.Events.DeleteEvent;
using RPBooking.Infrastructure.Persistence;

namespace UnitTests.Events
{
    public class DeleteEventTests : IDisposable
    {
        private readonly SqliteConnection _connection;
        private readonly AppDbContext _context;

        public DeleteEventTests()
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
        public async Task DeleteEvent()
        {
            //Arrange
            var seededEvent = new Event
            {
                Title = "Mothership 4e",
                Description = "Ursus 3 lies dormant..",
                Date = DateTime.UtcNow.AddDays(10),
                AgeRes = 18,
                Price = 199,
                MinParticipant = 3,
                MaxParticipant = 6,
                PrivateEvent = true,
                Type = Event.EventType.TabletopRP,
                Status = Event.EventStatus.Full
            };

            await _context.Events.AddRangeAsync(seededEvent);
            await _context.SaveChangesAsync();

            var handler = new DeleteEvent.Handler(_context);
            var command = new DeleteEvent.Command(seededEvent.Id);

            //Act
            var result = await handler.Handle(command, CancellationToken.None);

            //Assert
            Assert.True(result);
        }

        public void Dispose()
        {
            _context.Dispose();
            _connection.Dispose();
        }
    }
}
