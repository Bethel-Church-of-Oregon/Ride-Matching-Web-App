import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/passengers', async (req, res) => {
  try {
    const { name, phone, email, password, address, passengerCount } = req.body;
    if (!name || !phone || !email || !password || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await prisma.passenger.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await prisma.passenger.create({
      data: {
        name,
        phone,
        email,
        passwordHash,
        address,
        passengerCount: passengerCount || 1
      }
    });

    // Don't return passwordHash
    const { passwordHash: _ph, ...safe } = created as any;
    res.status(201).json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/drivers', async (req, res) => {
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

    const { passwordHash: _ph, ...safe } = created as any;
    res.status(201).json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Express server listening on http://localhost:${PORT}`);
});
