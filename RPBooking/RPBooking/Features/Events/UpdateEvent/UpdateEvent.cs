using MediatR;
using Microsoft.Identity.Client;
using RPBooking.Infrastructure.Persistence;
using static RPBooking.Features.Events.Event;

namespace RPBooking.Features.Events.UpdateEvent
{
    public static class UpdateEvent
    {
        //Request DTO
        public record UpdateEventRequest(
            string? Title = null,
            string? Description = null,
            DateTime? Date = null,
            int? AgeRes = null,
            double? Price = null,
            int? MinParticipant = null,
            int? MaxParticipant = null,
            bool? PrivateEvent = null,
            EventStatus? Status = null,
            EventType? Type = null
            );

        //Command
        public record Command(
            int Id,
            string? Title,
            string? Description,
            DateTime? Date,
            int? AgeRes,
            double? Price,
            int? MinParticipant,
            int? MaxParticipant,
            bool? PrivateEvent,
            EventStatus? Status,
            EventType? Type
            ) : IRequest<bool>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Command, bool>
        {
            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find
                var eventToUpdate = await context.Events.FindAsync([request.Id], cancellationToken);

                //Handle if not found
                if (eventToUpdate == null)
                {
                    return false;
                }

                //Update
                if (request.Title != null)
                {
                    eventToUpdate.Title = request.Title;
                }
                if (request.Description != null)
                {
                    eventToUpdate.Description = request.Description;
                }
                if (request.Date.HasValue)
                {
                    eventToUpdate.Date = request.Date.Value;
                }
                if (request.AgeRes.HasValue)
                {
                    eventToUpdate.AgeRes = request.AgeRes.Value;
                }
                if (request.Price.HasValue)
                {
                    eventToUpdate.Price = request.Price.Value;
                }
                if (request.MinParticipant.HasValue)
                {
                    eventToUpdate.MinParticipant = request.MinParticipant.Value;
                }
                if (request.MaxParticipant.HasValue)
                {
                    eventToUpdate.MaxParticipant = request.MaxParticipant.Value;
                }
                if (request.PrivateEvent.HasValue)
                {
                    eventToUpdate.PrivateEvent = request.PrivateEvent.Value;
                }
                if (request.Status.HasValue) 
                { 
                    eventToUpdate.Status = request.Status.Value; 
                }
                if (request.Type.HasValue)
                {
                    eventToUpdate.Type = request.Type.Value;
                }
                

                await context.SaveChangesAsync();
                return true;
            }
        }

        //Endpoint
        public static void MapUpdateEventEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapPatch("api/events/{id:int}", async (int id, UpdateEventRequest request, IMediator mediator) =>
            {
                var command = new Command(

                    id,
                    request.Title,
                    request.Description,
                    request.Date,
                    request.AgeRes,
                    request.Price,
                    request.MinParticipant,
                    request.MaxParticipant,
                    request.PrivateEvent,
                    request.Status,
                    request.Type
                );

                var success = await mediator.Send( command );

                return success ? Results.NoContent() : Results.NotFound(new {Message = $"Event med ID {id} findes ikke"});

            });
        }
    }
}
