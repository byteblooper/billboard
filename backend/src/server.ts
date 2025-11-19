import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Create Express app
const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Rian API Server',
    version: 'INFINITY',
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Handle 404
app.use(notFoundHandler);

// Handle errors
app.use(errorHandler);

const PORT = process.env.PORT || '3000';

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}/api`);
});

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});
