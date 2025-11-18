import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { registerPassenger } from '../api/core/passengers';
import { registerDriver } from '../api/core/drivers';

// Load environment variables from root .env file
dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/passengers', async (req, res) => {
  try {
    const result = await registerPassenger(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    console.error(err);
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({ message: err.message || 'Server error' });
  }
});

app.post('/api/drivers', async (req, res) => {
  try {
    const result = await registerDriver(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    console.error(err);
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({ message: err.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Express server listening on http://localhost:${PORT}`);
});
