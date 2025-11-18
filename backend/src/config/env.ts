import dotenv from 'dotenv';
dotenv.config();

// Simple config object - get values from .env file
export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret-key',
};

export default config;
