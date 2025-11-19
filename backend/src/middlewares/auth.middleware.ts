import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Check if user is logged in (has valid token)
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header (format: "Bearer token123...")
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    // Extract the token (remove "Bearer " from start)
    const token = authHeader.substring(7);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change-this-secret-key') as { userId: string };

    // Add user info to request (using 'any' to avoid TypeScript issues)
    (req as any).user = { id: decoded.userId };

    // Continue to next function
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
