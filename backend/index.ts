import "dotenv/config";
import express, { Request, Response } from 'express';
import { PrismaClient } from './generated/prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());










// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello I am Rian-dev!');
});

// Database connection test route
app.get('/db-test', async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({ 
      status: 'success', 
      message: 'Neon database connected successfully!',
      database: 'billboard'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
