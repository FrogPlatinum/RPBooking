using RPBooking.Features.Bookings;

namespace RPBooking.Features.Events
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int AgeRes { get; set; }
        public double Price { get; set; }
        public int MinParticipant { get; set; }
        public int MaxParticipant { get; set; }
        public bool PrivateEvent { get; set; }
        public List<Booking> Bookings { get; set; } = new();
        public EventStatus Status { get; set; }
        public enum EventStatus
        {
            Cancelled,
            Completed,
            Scheduled,
            Full
        }
        public EventType Type { get; set; }
        public enum EventType
        {
            TabletopRP,
            LiveRP
        }
    }
}
