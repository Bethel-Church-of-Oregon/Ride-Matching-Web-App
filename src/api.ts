// API configuration
// Development: Express server on port 4000
// Production: Vercel Serverless Functions
const API_BASE_URL = import.meta.env.PROD
  ? '/api'                        // Production (Vercel)
  : 'http://localhost:4000/api';  // Development (Express)

export interface PassengerData {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  passengerCount: number;
}

export interface DriverData {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  vehicleType: string;
  availableSeats: number;
  availableDays: string[];
}

export async function registerPassenger(data: PassengerData) {
  const response = await fetch(`${API_BASE_URL}/passengers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to register passenger';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function registerDriver(data: DriverData) {
  const response = await fetch(`${API_BASE_URL}/drivers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to register driver';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
