using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RPBooking.Exceptions;
using RPBooking.Features.Identity;
using RPBooking.Infrastructure.Persistence;


namespace RPBooking.Features.Bookings.CreateBooking
{
    public static class CreateBooking
    {
        //Command
        public record Command(
            int EventId,
            int UserId,
            List<Participant> Participants,
            string? Note
            ) : IRequest<int>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find event
                var eventEntity = await context.Events
                    .Include(e => e.Bookings)
                    .ThenInclude(b => b.Participants)
                    .FirstOrDefaultAsync(e => e.Id == request.EventId, cancellationToken);

                //Check if entity exists
                if (eventEntity is null)
                {
                    throw new NotFoundException();
                }

                //Business rule: Is Event available?
                if(eventEntity.Status != Events.Event.EventStatus.Scheduled)
                {
                    throw new UnprocessableEntityException();
                }

                //Business rule: Check capacity
                var incomingCount = request.Participants.Count();
                if(eventEntity.CurrentParticipant + incomingCount > eventEntity.MaxParticipant)
                {
                    throw new UnprocessableEntityException();
                }

                //Create booking
                var newBooking = new Booking
                {
                    EventId = request.EventId,
                    UserId = request.UserId,
                    Participants = request.Participants,
                    Note = request.Note
                };

                context.Bookings.Add( newBooking );

                //Update Event state
                eventEntity.CurrentParticipant += incomingCount;

                if(eventEntity.CurrentParticipant >= eventEntity.MaxParticipant)
                {
                    eventEntity.Status = Events.Event.EventStatus.Full;
                }

                await context.SaveChangesAsync(cancellationToken);

                return newBooking.Id;
            }
        }

        //Endpoint
        public static void MapCreateBookingEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPost("api/bookings", async (Command command, IMediator mediator) =>
            {
                int bookingId = await mediator.Send(command);
                return Results.Created($"/api/bookings/{bookingId}", new { Id = bookingId });
            });
        }
    }
}
