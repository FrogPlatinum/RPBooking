using MediatR;
using RPBooking.Exceptions;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Bookings.UpdateBooking
{
    public static class UpdateBooking
    {
        //Request DTO
        public record UpdateBookingRequest(
            string? ContactName = null,
            string? ContactEmail = null,
            string? PhoneNumber = null,
            List<Participant>? Participants = null,
            string? Note = null
            );

        //Command
        public record Command(
            int Id,
            string? ContactName,
            string? ContactEmail,
            string? PhoneNumber,
            List<Participant>? Participants,
            string? Note
            ) : IRequest<bool>;

        public class Handler(AppDbContext context) : IRequestHandler<Command, bool>
        {
            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find
                var bookingToUpdate = await context.Bookings.FindAsync([request.Id], cancellationToken);
                //Handle if not found
                if (bookingToUpdate == null)
                {
                    throw new NotFoundException();
                }
                //Update
                if (request.ContactName != null)
                {
                    bookingToUpdate.ContactName = request.ContactName;
                }
                if (request.ContactEmail != null)
                {
                    bookingToUpdate.ContactEmail = request.ContactEmail;
                }
                if (request.PhoneNumber != null)
                {
                    bookingToUpdate.PhoneNumber = request.PhoneNumber;
                }
                if (request.Participants != null)
                {
                    bookingToUpdate.Participants = request.Participants;
                }
                if (request.Note != null)
                {
                    bookingToUpdate.Note = request.Note;
                }
                await context.SaveChangesAsync();
                return true;
            }
        }

        public static void MapUpdateBookingEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPatch("api/bookings/{id:int}", async (int id, UpdateBookingRequest request, IMediator mediator) =>
            {
                var command = new Command(
                    id,
                    request.ContactName,
                    request.ContactEmail,
                    request.PhoneNumber,
                    request.Participants,
                    request.Note
                );

                var success = await mediator.Send(command);

                return success ? Results.NoContent() : Results.NotFound(new NotFoundException());
            });
        }
    }
}
