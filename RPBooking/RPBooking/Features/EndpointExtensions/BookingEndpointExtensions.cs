using RPBooking.Features.Bookings.CreateBooking;
using RPBooking.Features.Bookings.GetBookings;

namespace RPBooking.Features.EndpointExtensions
{
    public static class BookingEndpointExtensions
    {
        public static void MapBookingFeatureEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapCreateBookingEndpoint();
            app.MapGetBookingsEndpoint();
        }
    }
}
