using MediatR;
using Microsoft.EntityFrameworkCore;
using RPBooking.Exceptions;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Bookings.GetBookingById
{
    public static class GetBookingById
    {
        //Response DTO
        public record Response(
            int Id,
            string ContactName,
            string ContactEmail,
            string PhoneNumber,
            int ParticipantCount,
            List<Participant> Participants,
            string? Note
            );

        //Query
        public record Query(int Id) : IRequest<Response>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Query, Response>
        {
            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await context.Bookings
                    .AsNoTracking()
                    .Where(b => b.Id == request.Id)
                    .Select(b =>
                    new Response(
                        b.Id,
                        b.ContactName,
                        b.ContactEmail,
                        b.PhoneNumber,
                        b.Participants.Count,
                        b.Participants,
                        b.Note
                        ))
                        .FirstOrDefaultAsync(cancellationToken);
                
                if(result == null)
                {
                    throw new NotFoundException();
                }

                return result;
            }
        }

        //Endpoint
        public static void MapGetBookingById(this IEndpointRouteBuilder app)
        {
            app.MapGet("api/booking/{id:int}", async (int id, IMediator mediator) =>
            {
                var response = await mediator.Send(new Query(id));

                return Results.Ok(response);
            });
        }
    }
}
