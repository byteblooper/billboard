import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

// Register a new user
export const registerUser = async (email: string, password: string, name: string) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
    select: { id: true, email: true, name: true },
  });

  // Create a token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'change-this-secret-key', { expiresIn: '7d' });

  return { user, token };
};

// Login user
export const loginUser = async (email: string, password: string) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Create token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'change-this-secret-key', { expiresIn: '7d' });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
};

// Get user by ID
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });
  return user;
};
