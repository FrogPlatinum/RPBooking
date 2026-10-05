using RPBooking.Features.Bookings.CreateBooking;

namespace RPBooking.Features.EndpointExtensions
{
    public static class BookingEndpointExtensions
    {
        public static void MapBookingFeatureEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapCreateBookingEndpoint();
        }
    }
}
