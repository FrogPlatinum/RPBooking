import { Booking } from '../types/booking';

const API_URL = "http://10.0.2.2:5000";
 
// Get Bookings
export async function getBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.bookings;
}

// Get Booking by ID

export async function getBookingById(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/api/bookings/{id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.bookings;//This might need to change?
}

// Create Booking
export async function createBooking(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return Array.isArray(json) ? json : json.bookings;//This might need to change?
}

//Edit Booking

export async function editBooking(){
  const response = await fetch(`${API_URL}/api/bookings/{id}`, {
    method: "PATCH",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  
}

//Delete Booking

export async function deleteBooking(){
  const response = await fetch(`${API_URL}/api/bookings/{id}`, {
    method: "DEL",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();

}
