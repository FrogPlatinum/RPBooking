namespace RPBooking.Features.Bookings
{
    public class Booking
    {
        public int Id { get; set; }
        public string kontaktNavn { get; set; } = string.Empty;
        public int alder { get; set; }
        public int antalDeltagere { get; set; }
        public string? note { get; set; }
    }
}
