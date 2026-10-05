using MediatR;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Bookings.CreateBooking
{
    public static class CreateBooking
    {
        //Command
        public record Command(
            string ContactName,
            string ContactEmail,
            string PhoneNumber,
            List<Participant> Participants,
            string? Note
            ) : IRequest<int>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var newBooking = new Booking
                {
                    ContactName = request.ContactName,
                    ContactEmail = request.ContactEmail,
                    PhoneNumber = request.PhoneNumber,
                    Participants = request.Participants,
                    Note = request.Note
                };

                context.Bookings.Add( newBooking );
                await context.SaveChangesAsync(cancellationToken);

                return newBooking.Id;
            }
        }

        //Endpoint
        public static void MapCreateBookingEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPost("api/Bookings", async (Command command, IMediator mediator) =>
            {
                int bookingId = await mediator.Send(command);
                return Results.Created($"/api/bookings/{bookingId}", new { Id = bookingId });
            });
        }
    }
}
