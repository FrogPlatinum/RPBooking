import { Booking, CreateBooking } from '../types/booking';

const API_URL = "http://10.0.2.2:5000"; //for it to work on phone using our current setup, use your local IP4
 
// Get Booking
export async function getBooking(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "GET",
    headers: { Accept: "application/json" }, 
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return json.bookings;
}

// Get Booking by ID
// Might not be necessary, if we just "filter" by Id with the first `function`?
export async function getBookingById(id: number): Promise<Booking> {
  const response = await fetch(`${API_URL}/api/bookings/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
 return response.json();
}

// Create Booking
export async function createBooking(booking: CreateBooking): Promise<void> {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
    // We only need the header "Content-Type", since we're only sending data and recieving status codes.
    headers: { 
       "Content-Type": "application/json"
     },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
}

//Edit Booking
// I use "Partial<CreateBooking>", since it enables it to send only the changed elements and add more participants without ID.
export async function editBooking(id: number, booking: Partial<CreateBooking>): Promise<void>{ 
  
  const response = await fetch(`${API_URL}/api/bookings/${id}`, {
   
    method: "PATCH",
    body: JSON.stringify(booking),
    // We only need the header "Content-Type", since we're only sending data and recieving status codes.
    headers: { 
      "Content-Type": "application/json",
    },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
  
}

//Delete Booking

export async function deleteBooking(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/bookings/${id}`, {
    method: "DELETE",
   // We don't need headers, since we're not sending or recieving data.
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
}