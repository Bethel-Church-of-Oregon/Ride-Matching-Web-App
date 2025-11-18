import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, email, password, address, vehicleType, availableSeats, availableDays } = req.body;

    if (!name || !phone || !email || !password || !address || !vehicleType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await prisma.driver.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await prisma.driver.create({
      data: {
        name,
        phone,
        email,
        passwordHash,
        address,
        vehicleType,
        availableSeats: availableSeats || 1,
        availableDays: Array.isArray(availableDays) ? availableDays.join(',') : (availableDays || '')
      }
    });

    // Don't return passwordHash
    const { passwordHash: _ph, ...safe } = created as any;
    res.status(201).json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await prisma.$disconnect();
  }
}
