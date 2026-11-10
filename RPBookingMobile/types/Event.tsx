export type Event= {
  id: number;
  title: string;
  description: string;
  date: string;
  address: string;
  city: string;
  ageRes: number;
  price: number;
  minParticipant: number;
  maxParticipant: number;
  privateEvent: boolean;
  status: string | number;
  type: string | number;

};


// Since we don't need or want ID when we create and event, I've made a seperate type for creating events. (Think of DTO)
export type CreateEvent= Omit<Event, "id">;



// Old way of doing it, without Omit:
// export type CreateEvent= {
//   title: string;
//   description: string;
//   date: string;
//   address: string;
//   city: string;
//   ageRes: number;
//   price: number;
//   minParticipant: number;
//   maxParticipant: number;
//   privateEvent: boolean;
//   status: string | number;
//   type: string | number;
// };

