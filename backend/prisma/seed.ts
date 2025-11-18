import { PrismaClient } from '../generated/prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword,
    },
  });

  console.log('✅ Created users:', { user1, user2 });

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop Pro 15',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        category: 'Electronics',
        stock: 50,
        imageUrl: 'https://example.com/laptop.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 29.99,
        category: 'Accessories',
        stock: 200,
        imageUrl: 'https://example.com/mouse.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with blue switches',
        price: 89.99,
        category: 'Accessories',
        stock: 100,
        imageUrl: 'https://example.com/keyboard.jpg',
      },
    }),
  ]);

  console.log('✅ Created products:', products.length);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
