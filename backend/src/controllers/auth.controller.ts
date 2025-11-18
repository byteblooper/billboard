import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const result = await authService.registerUser(email, password, name);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current user info
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // Get user ID from token
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
    
    const user = await authService.getUserById(userId);
    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout (simple version - just a message)
export const logout = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

// Refresh token (placeholder)
export const refreshToken = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Token refresh not implemented yet',
  });
};
