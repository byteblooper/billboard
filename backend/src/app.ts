import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Create Express app
const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API Server',
    version: '1.0.0',
  });
});

// All API routes
app.use('/api', routes);

// Handle 404
app.use(notFoundHandler);

// Handle errors
app.use(errorHandler);

export default app;
