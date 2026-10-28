
import { Event, CreateEvent } from '../types/event';

const API_URL = "http://10.0.2.2:5000"; //for it to work on phone using our current setup, use your local IP4
 
// Get Events
export async function getEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events`, {
    method: "GET",
    headers: { Accept: "application/json" }, 
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return json.events;
}

// Get by ID
// Might not be necessary, if we just "filter" by Id with the first `function`?
export async function getEventById(id: number): Promise<Event> {
  const response = await fetch(`${API_URL}/api/events/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
 return response.json();
}

// Create Event
export async function createEvent(event: CreateEvent): Promise<void> {
  const response = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    body: JSON.stringify(event),
    // We only need the header "Content-Type", since we're only sending data and recieving status codes.
    headers: { 
       "Content-Type": "application/json"
     },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
}

//Edit Event
// I use "Partial<Event>", since it enables it to send only the changed elements.
export async function editEvent(id: number, event: Partial<CreateEvent>): Promise<void>{
  
  const response = await fetch(`${API_URL}/api/events/${id}`, {
   
    method: "PATCH",
    body: JSON.stringify(event),
    // We only need the header "Content-Type", since we're only sending data and recieving status codes.
    headers: { 
      "Content-Type": "application/json",
    },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
  
}

//Delete Event

export async function deleteEvent(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/events/${id}`, {
    method: "DELETE",
   // We don't need headers, since we're not sending or recieving data.
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
}

//Future filtering example:

//Get Live RP Events
export async function getLiveRPEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events?type=0`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;
}

//Get Tabletop RP Events
export async function getTabletopRPEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events?type=1`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;
}

//Get Private Events
export async function getPrivateEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events?privateEvent=true`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;
}

// Get Non-private Events
export async function getNonPrivateEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events?privateEvent=false`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;
}