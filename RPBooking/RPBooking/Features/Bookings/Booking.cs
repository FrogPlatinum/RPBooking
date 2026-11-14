using RPBooking.Features.Events;
using RPBooking.Features.Identity;

namespace RPBooking.Features.Bookings
{
    public class Booking
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public Event? Event { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<Participant> Participants { get; set; } = new();
        public string? Note { get; set; }
    }
}
