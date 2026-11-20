import { CreateUser, User } from "../types/user";

const API_URL = "http://10.0.2.2:5000"; //for it to work on phone using our current setup, use your local IP4
 
// Get User
export async function getUser(): Promise<User[]> {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "GET",
    headers: { Accept: "application/json" }, 
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
  const json = await response.json();
  return json.users;
}

// Get User by ID

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
 return response.json();
}

// Create User
export async function createUser(user: CreateUser): Promise<void> {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify(user),
    // We only need the header "Content-Type", since we're only sending data and recieving status codes.
    headers: { 
       "Content-Type": "application/json"
     },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
}

//Edit User
// I use "Partial<User>", since it enables it to send only the changed elements.
export async function editUser(id: number, user: Partial<CreateUser>): Promise<void>{
  
  const response = await fetch(`${API_URL}/api/users/${id}`, {
   
    method: "PATCH",
    body: JSON.stringify(user),
    // We only need the header "Content-Type", since we're only sending data and recieving status codes.
    headers: { 
      "Content-Type": "application/json",
    },
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
  
}

//Delete User

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
   // We don't need headers, since we're not sending or recieving data.
  });
 
  if (!response.ok) {
    throw new Error(`Serveren svarede med status ${response.status}`);
  }
 
}