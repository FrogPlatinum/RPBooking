using RPBooking.Features.Events.CreateEvent;
using RPBooking.Features.Events.GetEventById;
using RPBooking.Features.Events.GetEvents;

namespace RPBooking.Features
{
    public static class EndpointExtensions
    {
        public static void MapFeatureEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapCreateEventEndpoint();
            app.MapGetEventByIdEndpoint();
            app.MapGetEventsEndpoint();
        }
    }
}
