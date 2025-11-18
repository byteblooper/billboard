import prisma from '../config/database';

// Get all users
export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  return users;
};

// Get one user by ID
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });
  return user;
};

// Update user
export const updateUser = async (userId: string, name: string, email: string) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name, email },
    select: { id: true, email: true, name: true },
  });
  return user;
};

// Delete user
export const deleteUser = async (userId: string) => {
  await prisma.user.delete({ where: { id: userId } });
};
