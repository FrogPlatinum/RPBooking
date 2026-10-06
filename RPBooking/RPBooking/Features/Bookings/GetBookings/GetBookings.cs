using MediatR;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Bookings.GetBookings
{
    public static class GetBookings
    {
        //DTO
        public record BookingDto(
            int Id,
            string ContactName,
            string ContactEmail,
            string PhoneNumber,
            int ParticipantCount,
            List<Participant> Participants,
            string? Note
            );

        //Respone
        public record Response(List<BookingDto> Bookings);

        //Query
        public record Query() : IRequest<Response>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Query, Response>
        {
            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                //Fetch from DB
                var bookingsFromDb = await context.Bookings.AsNoTracking().ToListAsync(cancellationToken);

                //Mapping
                var bookingDtos = await context.Bookings
                    .AsNoTracking()
                    .Select(b => new BookingDto(
                    b.Id,
                    b.ContactName,
                    b.ContactEmail,
                    b.PhoneNumber,
                    b.Participants.Count,
                    b.Participants,
                    b.Note
                    )).ToListAsync(cancellationToken);

                return new Response(bookingDtos);
            }
        }

        //Endpoint
        public static void MapGetBookingsEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapGet("api/bookings", async (IMediator mediator) =>
            {
                var response = await mediator.Send(new Query());
                return Results.Ok(response);
            });
        }
    }
}
