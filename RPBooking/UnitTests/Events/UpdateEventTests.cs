using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RPBooking.Features.Events;
using RPBooking.Features.Events.UpdateEvent;
using RPBooking.Infrastructure.Persistence;
using SQLitePCL;

namespace UnitTests.Events
{
    public class UpdateEventTests : IDisposable
    {
        private readonly SqliteConnection _connection;
        private readonly AppDbContext _context;

        public UpdateEventTests()
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
        public async Task PartiallyUpdateEvent()
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

            var handler = new UpdateEvent.Handler(_context);
            var command = new UpdateEvent.Command(
                Id: seededEvent.Id,
                Title: "Mothership 3e",
                Description: null,
                Date: null,
                AgeRes: null,
                Price: null,
                MinParticipant: null,
                MaxParticipant: null,
                PrivateEvent: null,
                Status: null,
                Type: null
                );

            //Act
            var result = await handler.Handle(command, CancellationToken.None);

            //Assert
            Assert.True(result);

            //Check change
            var updatedEvent = await _context.Events.FindAsync(seededEvent.Id);
            Assert.NotNull(updatedEvent);
            Assert.Equal("Mothership 3e", updatedEvent.Title);

            //Check rest is same
            Assert.Equal("Ursus 3 lies dormant..", updatedEvent.Description);
            Assert.Equal(199, updatedEvent.Price);

        }

        public void Dispose()
        {
            _context.Dispose();
            _connection.Dispose();
        }
    }
}
