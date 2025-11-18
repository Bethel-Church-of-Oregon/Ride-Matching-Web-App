import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface DriverRegistrationData {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  vehicleType: string;
  availableSeats?: number;
  availableDays?: string[] | string;
}

export interface DriverResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  vehicleType: string;
  availableSeats: number;
  availableDays: string;
  createdAt: Date;
}

export async function registerDriver(data: DriverRegistrationData): Promise<DriverResponse> {
  // Validate required fields
  if (!data.name || !data.phone || !data.email || !data.password || !data.address || !data.vehicleType) {
    throw new Error('Missing required fields');
  }

  // Check if email already exists
  const existing = await prisma.driver.findUnique({ where: { email: data.email } });
  if (existing) {
    const error = new Error('Email already registered');
    (error as any).statusCode = 409;
    throw error;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Create driver
  const created = await prisma.driver.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      passwordHash,
      address: data.address,
      vehicleType: data.vehicleType,
      availableSeats: data.availableSeats || 1,
      availableDays: Array.isArray(data.availableDays)
        ? data.availableDays.join(',')
        : (data.availableDays || '')
    }
  });

  // Don't return passwordHash
  const { passwordHash: _ph, ...safe } = created as any;
  return safe;
}
