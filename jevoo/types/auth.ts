export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  exp?: number; // Token expiration timestamp in epoch seconds
  createdAt?: string;
  updatedAt?: string;
  sessions?: Array<{
    id: string;
    createdAt: string;
    expiresAt: string;
  }>;
  customer?: {
    docs: string[];
    hasNextPage: boolean;
  };
  collection?: string;
  _strategy?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  exp?: number; // Token expiration timestamp
  message?: string; // Response message from API
  needsLogin?: boolean; // Flag to indicate registration succeeded but needs login
}

export interface ApiError {
  errors: Array<{
    name: string;
    data?: {
      collection?: string;
      errors?: Array<{
        message: string;
        path?: string;
      }>;
    };
    message: string;
  }>;
}

export interface AuthError extends Error {
  code?: string;
  field?: string;
  details?: string;
}