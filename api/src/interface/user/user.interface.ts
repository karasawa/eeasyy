export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  hashedRefreshToken: string;
}

export interface CreateUser {
  id: number;
  email: string;
  createdAt: Date;
}

export interface ValidatedUser {
  id: number;
  email: string;
}
