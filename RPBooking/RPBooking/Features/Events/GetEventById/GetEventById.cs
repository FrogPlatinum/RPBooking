using MediatR;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;
using static RPBooking.Features.Events.Event;

namespace RPBooking.Features.Events.GetEventById
{
    public static class GetEventById
    {
        //Response DTO
        public record Response(
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
        
        //Query
        public record Query(int Id) : IRequest<Response?>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Query, Response?>
        {
            public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Events
                    .AsNoTracking()
                    .Where(e => e.Id == request.Id)
                    .Select(e => 
                    new Response(
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
                        )).FirstOrDefaultAsync(cancellationToken);
                   
            }
        }

        //Endpoint
        public static void MapGetEventByIdEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapGet("api/events/{id:int}", async (int id, IMediator mediator) =>
            {
                var response = await mediator.Send(new Query(id));

                return response is null ? Results.NotFound(new { Message = $"Eventet med ID {id} findes ikke" }) : Results.Ok(response);
            });
        }
    }
}
