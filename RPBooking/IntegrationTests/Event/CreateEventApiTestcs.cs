using System;
using System.Linq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using RPBooking.Infrastructure.Persistence;
using Xunit;
using static RPBooking.Features.Events.GetEvents.GetEvents;

namespace IntegrationTests.Event
{
    public class CreateEventApiTest : IDisposable
    {
        private readonly HttpClient _client;

        public CreateEventApiTest()
        {
            // Create in-memory SQLite connection
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();

            // Create factory with test database
            var factory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        // Remove the real DbContext
                        var descriptor = services.SingleOrDefault(
                            d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                        if (descriptor != null)
                            services.Remove(descriptor);

                        // Add SQLite in-memory DbContext
                        services.AddDbContext<AppDbContext>(options =>
                            options.UseSqlite(connection));
                    });
                });

            // Initialize the database schema
            using var scope = factory.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            context.Database.EnsureCreated();

            // Create HttpClient for the test server
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task PostEvent_CreatesEventAndReturnsId()
        {
            // Arrange: Define the event data
            var requestBody = new
            {
                Title = "Call of Cthulhu",
                Description = "Spooks and Horror",
                Date = "2024-01-15T18:00:00Z",
                AgeRes = 16,
                Price = 199,
                MinParticipant = 3,
                MaxParticipant = 6,
                PrivateEvent = false,
                Type = "TabletopRP",
                Status = "Scheduled"
            };

            // Act: Send POST request to create event
            var response = await _client.PostAsJsonAsync("/api/events", requestBody);

            // Assert: Verify response
            response.EnsureSuccessStatusCode();
            var createdEvent = await response.Content.ReadFromJsonAsync<EventDto>();
            Assert.NotNull(createdEvent);
            Assert.True(createdEvent.Id > 0);
            Assert.Equal("Call of Cthulhu", createdEvent.Title);
        }

        public void Dispose()
        {
            _client?.Dispose();
        }
    }
}
