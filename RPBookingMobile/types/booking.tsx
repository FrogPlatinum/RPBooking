import { Participant } from "../types/participant";
import { Event } from "./event";
import { User } from "./user";

export type Booking= {
  id: number;
  eventId: number;
  event?: Event;
  userId: number;
  user?: User;
  // participantCount: number;
  participants: Participant[];
  note?: string;
};

export type CreateBooking= {
  eventId: number;
  event?: Event;
  userId: number;
  user?: User;
  // participantCount: number;
  participants: Omit<Participant, "id">[];
  note?: string;
};