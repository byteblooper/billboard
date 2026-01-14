// ============================================================================
// USERS DATA - User Profile Repository
// ============================================================================

import { User } from '../types'

// ============================================================================
// DEMO DATA - USERS
// ============================================================================

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+880 1712-345678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    address: '123 Main Street, Dhaka, Bangladesh',
    createdAt: '2024-06-15T10:30:00Z'
  },
  {
    id: 'usr_002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+880 1812-456789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    address: '456 Fashion Ave, Dhaka, Bangladesh',
    createdAt: '2024-08-20T14:15:00Z'
  }
]

// ============================================================================
// DEMO DATA - CURRENT USER (for profile page)
// ============================================================================

export const currentUser: User = users[0]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id)
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email)
}
