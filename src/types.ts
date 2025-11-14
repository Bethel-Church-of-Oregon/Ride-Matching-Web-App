// Type definitions for the ride matching app

export type UserMode = 'passenger' | 'driver' | 'admin' | null;

export interface User {
  id: number;
  name: string;
  email: string;
}

