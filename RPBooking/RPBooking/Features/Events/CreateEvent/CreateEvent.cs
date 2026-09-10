using MediatR;
using RPBooking.Infrastructure.Persistence;
using static RPBooking.Features.Events.Event;

namespace RPBooking.Features.Events.CreateEvent
{
    public static class CreateEvent
    {
        //Command
        public record Command(
            string Title,
            string Description,
            DateTime Date,
            int AgeRes,
            double Price,
            int MinParticipant,
            int MaxParticipant,
            bool PrivateEvent,
            EventStatus Status,
            EventType Type
        ): IRequest<int>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var newEvent = new Event
                {
                    Title = request.Title,
                    Description = request.Description,
                    Date = request.Date,
                    AgeRes = request.AgeRes,
                    Price = request.Price,
                    MinParticipant = request.MinParticipant,
                    MaxParticipant = request.MaxParticipant,
                    PrivateEvent = request.PrivateEvent,
                    Status = request.Status,
                    Type = request.Type
                };

                context.Events.Add( newEvent );

                await context.SaveChangesAsync(cancellationToken);

                return newEvent.Id;
            }
        }

        //Endpoint
        public static void MapCreateEventEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPost("api/events", async (Command command, IMediator mediator) =>
            {
                int eventId = await mediator.Send(command);
                return Results.Created($"/api/events/{eventId}", new { Id = eventId });
            });
        }
    }
}
