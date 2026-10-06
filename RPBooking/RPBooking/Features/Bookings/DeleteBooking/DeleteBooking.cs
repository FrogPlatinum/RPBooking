using MediatR;
using RPBooking.Exceptions;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Bookings.DeleteBooking
{
    public static class DeleteBooking
    {
        //Command
        public record Command(int id) : IRequest<Unit>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Command, Unit>
        {
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find
                var bookingToDelete = await context.Bookings.FindAsync([request.id, cancellationToken]);

                if(bookingToDelete == null)
                {
                    throw new NotFoundException();
                }

                //Remove and save
                context.Bookings.Remove(bookingToDelete);
                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }

        //Endpoint
        public static void MapDeleteBookingEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapDelete("api/bookings/{id:int}", async (int id, IMediator mediator) =>
            {
                await mediator.Send(new Command(id));

                return Results.NoContent();
            });
        }
    }
}
