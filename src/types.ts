// Type definitions for the ride matching app

export type UserMode = 'passenger' | 'driver' | null;

export interface User {
  id: number;
  name: string;
  email: string;
}

