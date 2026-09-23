using System.Runtime.CompilerServices;
using MediatR;
using RPBooking.Infrastructure.Persistence;

namespace RPBooking.Features.Events.DeleteEvent
{
    public static class DeleteEvent
    {
        //Command
        public record Command(int id) : IRequest<bool>;

        //Handler
        public class Handler(AppDbContext context) : IRequestHandler<Command, bool>
        {
            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find
                var eventToDelete = await context.Events.FindAsync([request.id], cancellationToken);

                //Handle if not found
                if (eventToDelete == null)
                {
                    return false;
                }

                //Remove and save
                context.Events.Remove(eventToDelete);
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }

        //Endpoint
        public static void MapDeleteEventEndpoint(this IEndpointRouteBuilder app)
        {
            app.MapDelete("api/remove/{id:int}", async (int id, IMediator mediator) =>
            {
                var response = await mediator.Send(new Command(id));

                return response
                ? Results.NoContent()
                : Results.NotFound(new { Message = $"Eventet med ID {id} findes ikke" });
            });
        }
    }
}
