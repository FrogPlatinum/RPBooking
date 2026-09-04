namespace RPBooking.Features.Events
{
    public class Event
    {
        public int Id { get; set; }
        public string titel { get; set; } = string.Empty;
        public EventType eventType { get; set; }
        public enum EventType
        {
            FuldtBooket,
            BordrollespilEnkelt,
            BordrollespilGruppe,
            LiverollespilEnkelt,
            LiverollespilGruppe
        }
        public EventStatus eventStatus { get; set; }
        public enum EventStatus
        {
            Planlagt,
            Afholdt,
            Annulleret
        }
        public DateTime tidspunkt { get; set; }
        public int aldersgraense { get; set; }
        public int antalDeltager { get; set; }
        public string? beskrivelse { get; set; }
    }
}
