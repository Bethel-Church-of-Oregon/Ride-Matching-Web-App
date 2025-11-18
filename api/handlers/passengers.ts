import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface PassengerRegistrationData {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  passengerCount?: number;
}

export interface PassengerResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  passengerCount: number;
  createdAt: Date;
}

export async function registerPassenger(data: PassengerRegistrationData): Promise<PassengerResponse> {
  // Validate required fields
  if (!data.name || !data.phone || !data.email || !data.password || !data.address) {
    throw new Error('Missing required fields');
  }

  // Check if email already exists
  const existing = await prisma.passenger.findUnique({ where: { email: data.email } });
  if (existing) {
    const error = new Error('Email already registered');
    (error as any).statusCode = 409;
    throw error;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Create passenger
  const created = await prisma.passenger.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      passwordHash,
      address: data.address,
      passengerCount: data.passengerCount || 1
    }
  });

  // Don't return passwordHash
  const { passwordHash: _ph, ...safe } = created as any;
  return safe;
}
