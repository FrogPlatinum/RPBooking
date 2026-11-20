export type User= {
  id: number;
  name: string;
  passwordHash: string;
  role: string | number;
  age: number;
  email: string;
  phone: string;
};

export type CreateUser = Omit<User, "id">;