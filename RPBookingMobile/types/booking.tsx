import {Participant} from "../types/participant"

export type Booking= {
  id: number;
  contactName: string;
  contactEmail: string;
  phoneNumber: string;
  participantCount: number;
  participants: Participant[];
};

export type CreateBooking= {
  contactName: string;
  contactEmail: string;
  phoneNumber: string;
  participantCount: number;
  participants: Omit<Participant, "id">[];
};