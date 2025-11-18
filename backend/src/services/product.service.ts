import prisma from '../config/database';

// Get all products
export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return products;
};

// Get one product by ID
export const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  return product;
};

// Create new product
export const createProduct = async (
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  imageUrl?: string
) => {
  const product = await prisma.product.create({
    data: { name, description, price, category, stock, imageUrl },
  });
  return product;
};

// Update product
export const updateProduct = async (
  productId: string,
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  imageUrl?: string
) => {
  const product = await prisma.product.update({
    where: { id: productId },
    data: { name, description, price, category, stock, imageUrl },
  });
  return product;
};

// Delete product
export const deleteProduct = async (productId: string) => {
  await prisma.product.delete({ where: { id: productId } });
};
