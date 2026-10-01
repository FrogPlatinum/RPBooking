
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