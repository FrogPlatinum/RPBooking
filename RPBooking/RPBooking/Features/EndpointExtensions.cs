using RPBooking.Features.Events.CreateEvent;
using RPBooking.Features.Events.DeleteEvent;
using RPBooking.Features.Events.GetEventById;
using RPBooking.Features.Events.GetEvents;
using RPBooking.Features.Events.UpdateEvent;

namespace RPBooking.Features
{
    public static class EndpointExtensions
    {
        public static void MapFeatureEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapCreateEventEndpoint();
            app.MapGetEventByIdEndpoint();
            app.MapGetEventsEndpoint();
            app.MapDeleteEventEndpoint();
            app.MapUpdateEventEndpoint();
        }
    }
}
