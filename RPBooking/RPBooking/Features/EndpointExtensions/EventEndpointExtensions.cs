using RPBooking.Features.Events.CreateEvent;
using RPBooking.Features.Events.DeleteEvent;
using RPBooking.Features.Events.GetEventById;
using RPBooking.Features.Events.GetEvents;
using RPBooking.Features.Events.UpdateEvent;

namespace RPBooking.Features.EndpointExtensions
{
    public static class EventEndpointExtensions
    {
        public static void MapEventFeatureEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapCreateEventEndpoint();
            app.MapGetEventByIdEndpoint();
            app.MapGetEventsEndpoint();
            app.MapDeleteEventEndpoint();
            app.MapUpdateEventEndpoint();
        }
    }
}
