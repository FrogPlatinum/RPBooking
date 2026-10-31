export type Event= {
  id: number;
  title: string;
  description: string;
  date: string;
  ageRes: number;
  price: number;
  minParticipant: number;
  maxParticipant: number;
  privateEvent: number;
  status: string;
  type: string;

};

// Since we don't need or want ID when we create and event, I've made a seperate type for creating events. (Think of DTO)
export type CreateEvent= {
  title: string;
  description: string;
  date: string;
  ageRes: number;
  price: number;
  minParticipant: number;
  maxParticipant: number;
  privateEvent: number;
  status: string;
  type: string;
};