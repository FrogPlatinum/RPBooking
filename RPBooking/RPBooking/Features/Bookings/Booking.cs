namespace RPBooking.Features.Bookings
{
    public class Booking
    {
        public int Id { get; set; }
        public string ContactName { get; set; } = string.Empty;
        public string ContactEmail { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public int ParticipantCount => Participants.Count;
        public List<Participant> Participants { get; set; } = new();
        public string? Note { get; set; }
    }
}
