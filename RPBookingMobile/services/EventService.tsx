
import { Event } from '../types/Event';

const API_URL = "http://10.0.2.2:5000";
 
export async function getEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;
}
// Might not be necessary, if we just "filter" by Id with the first `function`?
export async function getEventById(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events/{id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;//This might need to change?
}

export async function createEvent(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;//This might need to change?
}

export async function editEvent(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/events/{id}`, {
    method: "PATCH",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.events;//This might need to change?
}

//Future filtering example:
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
export async function getTabeltopRPEvents(): Promise<Event[]> {
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
export async function getNotPrivateEvents(): Promise<Event[]> {
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