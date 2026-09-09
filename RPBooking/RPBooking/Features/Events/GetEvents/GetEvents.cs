using MediatR;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Events.GetEvents
{
    public static class GetEvents
    {
        //DTO
        public record EventDto(
            int Id,
            string Title,
            string Description,
            DateTime Date,
            int AgeRes,
            double Price,
            int MinParticipant,
            int MaxParticipant,
            bool PrivateEvent,
            string Status,
            string Type
            );

        //Response
        public record Response(List<EventDto> Events);

        //Query
        public record Query() : IRequest<Response>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Query, Response>
        {
            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                //Fetch from DB
                var eventsFromDb = await context.Events.AsNoTracking().ToListAsync(cancellationToken);

                //Mapping Entity to DTO
                var eventDtos = eventsFromDb.Select(e => new EventDto(
                        e.Id,
                        e.Title,
                        e.Description,
                        e.Date,
                        e.AgeRes,
                        e.Price,
                        e.MinParticipant,
                        e.MaxParticipant,
                        e.PrivateEvent,
                        e.Status.ToString(),
                        e.Type.ToString()
                        )).ToList();

                return new Response(eventDtos);
            }
        }

        //Endpoint
        public static void MapGetEventsEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapGet("api/events", async (IMediator mediator) =>
            {
                var response = await mediator.Send(new Query());
                return Results.Ok(response);
            });
        }
    }
}
