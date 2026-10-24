using RPBooking.Features.Bookings.CreateBooking;
using RPBooking.Features.Bookings.DeleteBooking;
using RPBooking.Features.Bookings.GetBookingById;
using RPBooking.Features.Bookings.GetBookings;
using RPBooking.Features.Bookings.UpdateBooking;

namespace RPBooking.Features.EndpointExtensions
{
    public static class BookingEndpointExtensions
    {
        public static void MapBookingFeatureEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapCreateBookingEndpoint();
            app.MapGetBookingsEndpoint();
            app.MapGetBookingByIdEndpoint();
            app.MapUpdateBookingEndpoint();
            app.MapDeleteBookingEndpoint();
        }
    }
}
