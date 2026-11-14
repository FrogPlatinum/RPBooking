using MediatR;
using Microsoft.EntityFrameworkCore;
using RPBooking.Exceptions;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Bookings.UpdateBooking
{
    public static class UpdateBooking
    {
        //Request DTO
        public record UpdateBookingRequest(
            List<Participant>? Participants = null,
            string? Note = null
            );

        //Command
        public record Command(
            int Id,
            List<Participant>? Participants,
            string? Note
            ) : IRequest<bool>;

        public class Handler(AppDbContext context) : IRequestHandler<Command, bool>
        {
            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find booking and related event and participants
                var bookingToUpdate = await context.Bookings
                    .Include(b => b.Event)
                    .Include(b => b.Participants)
                    .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);
                
                //Handle if not found
                if (bookingToUpdate == null)
                {
                    throw new NotFoundException();
                }
                
                //Handle participant count changes and capacity validation
                if(request.Participants != null)
                {
                    var oldParticipantCount = bookingToUpdate.Participants.Count;
                    var newParticipantCount = request.Participants.Count;
                    var difference = newParticipantCount - oldParticipantCount;

                    //Handle adding more participants
                    if(difference > 0)
                    {
                        var eventEntity = bookingToUpdate.Event;
                        if(eventEntity.CurrentParticipant + difference > eventEntity.MaxParticipant)
                        {
                            throw new BadRequestException();
                        }
                    }

                    //Handle if removing participants. Decrease counter and open event
                    else if(difference < 0)
                    {
                        var eventEntity = bookingToUpdate.Event;
                        eventEntity.CurrentParticipant += difference;

                        if(eventEntity.Status == Events.Event.EventStatus.Full && eventEntity.CurrentParticipant < eventEntity.MaxParticipant)
                        {
                            eventEntity.Status = Events.Event.EventStatus.Scheduled;
                        }

                    }

                    bookingToUpdate.Participants = request.Participants;
                }
                
                //Update note if provided
                if(request.Note != null)
                {
                    bookingToUpdate.Note = request.Note;
                }

                await context.SaveChangesAsync(cancellationToken);
                return true;
            }
        }

        public static void MapUpdateBookingEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPatch("api/bookings/{id:int}", async (int id, UpdateBookingRequest request, IMediator mediator) =>
            {
                var command = new Command(
                    id,
                    request.Participants,
                    request.Note
                );

                await mediator.Send(command);
                return Results.NoContent();
            });
        }
    }
}
