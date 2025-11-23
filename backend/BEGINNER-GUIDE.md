# 🎓 Beginner's Guide to Your E-commerce Backend

## ✅ What's This Project?

A **clean and simple REST API** for an e-commerce platform built with Node.js, Express, TypeScript, and Prisma!

### 📦 Server is NOW RUNNING! ✅
```
✅ Server running on http://localhost:3000
📝 API: http://localhost:3000/api
```

---

## 📁 Simple Project Structure

```
backend/
├── src/
│   ├── server.ts              # Main entry point - starts the server
│   │
│   ├── config/
│   │   └── database.ts        # Database connection (Prisma Client)
│   │
│   ├── routes/                # API endpoints (all combined with handlers)
│   │   ├── auth.routes.ts     # /api/auth/* - register, login, logout
│   │   ├── user.routes.ts     # /api/users/* - user CRUD operations
│   │   └── product.routes.ts  # /api/products/* - product CRUD operations
│   │
│   ├── services/              # Business logic (talks to database)
│   │   ├── auth.service.ts    # User authentication logic
│   │   ├── user.service.ts    # User operations
│   │   └── product.service.ts # Product operations
│   │
│   ├── middlewares/           # Request filters/validators
│   │   ├── auth.middleware.ts # Checks if user is logged in
│   │   └── error.middleware.ts# Handles errors
│   │
│   └── types/
│       └── custom.d.ts        # TypeScript type definitions
│
├── prisma/
│   ├── schema.prisma          # Database schema (User, Product models)
│   └── seed.ts                # Sample data for testing
│
├── .env                       # Environment variables (PORT, DATABASE_URL, JWT_SECRET)
└── package.json               # Dependencies and scripts
```

---

## 🔑 Key Concepts (Simple Explanation)

### 1. **Routes** (API Endpoints)
- Routes define the URLs and what happens when you visit them
- Each route file now contains both the URL definition AND the handler code
- Example: `GET /api/products` → Returns all products

### 2. **Services** (Business Logic)
- Services handle all database operations
- They contain the actual logic for creating, reading, updating, and deleting data
- Keep your code organized and reusable

### 3. **Middlewares** (Gatekeepers)
- Run before your route handlers
- Check permissions, validate data, handle errors
- Example: `authMiddleware` checks if user is logged in

### 4. **Prisma** (Database Tool)
- Makes talking to the database easy
- Type-safe queries (no SQL injection!)
- Auto-generates types for TypeScript

---

## 🚀 How to Use Your API

### Quick Start Commands:

```bash
# Start development server
npm run dev

# View database in browser
npm run prisma:studio

# Add sample data
npm run seed

# Regenerate Prisma Client (after schema changes)
npx prisma generate
```

### Test in Browser, Postman, or Thunder Client:

#### 1. **Check if server is running:**
```
GET http://localhost:3000/
```
Response:
```json
{
  "message": "Rian API Server",
  "version": "INFINITY"
}
```

#### 2. **Health check:**
```
GET http://localhost:3000/api/health
```

#### 3. **Register a new user:**
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

#### 4. **Login:**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```
Response includes a `token` - **Copy this token!**

#### 5. **Get current user info (requires token):**
```
GET http://localhost:3000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 6. **Get all products (public):**
```
GET http://localhost:3000/api/products
```

#### 7. **Create a product (requires token):**
```
POST http://localhost:3000/api/products
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stock": 10,
  "imageUrl": "https://example.com/laptop.jpg"
}
```

---

## 📝 What Each File Does (Simplified)

### **src/server.ts** (Main Entry Point)
```typescript
// Creates Express app, sets up all routes and middlewares
// Starts server on port 3000
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
```

### **src/config/database.ts**
```typescript
// Single Prisma Client instance for database connection
const prisma = new PrismaClient();
export default prisma;
```

### **src/routes/auth.routes.ts** (Example)
```typescript
// Route + Handler in one file (simplified structure)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const result = await authService.registerUser(email, password, name);
  res.status(201).json({ success: true, data: result });
});
```

### **src/services/auth.service.ts**
```typescript
// Business logic - talks to database via Prisma
export const registerUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({...});
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return { user, token };
};
```

### **src/middlewares/auth.middleware.ts**
```typescript
// Checks if request has valid JWT token
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
  next();
};
```

---

## 🎯 Common Tasks

### View/Edit Database:
```bash
npm run prisma:studio
# Opens at http://localhost:5555
```

### Add Sample Data:
```bash
npm run seed
```

### Update Database Schema:
1. Edit `prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name your_change_name`
3. Prisma Client auto-regenerates

### Reset Database:
```bash
npx prisma migrate reset
```

### Check for Errors:
- Look at the terminal where `npm run dev` is running
- Errors show with stack traces

---

## 🔐 Environment Variables (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@host/database"

# Server
PORT=3000

# JWT Authentication
JWT_SECRET=change-this-secret-key
```

⚠️ **Never commit .env to Git!** (It's in .gitignore)

---

## 🛣️ Complete API Reference

### **Authentication Routes** (`/api/auth`)
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login user |
| GET | `/me` | ✅ | Get current user |
| POST | `/logout` | ✅ | Logout user |
| POST | `/refresh` | ❌ | Refresh token (placeholder) |

### **User Routes** (`/api/users`)
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/` | ✅ | Get all users |
| GET | `/:id` | ✅ | Get user by ID |
| PUT | `/:id` | ✅ | Update user |
| DELETE | `/:id` | ✅ | Delete user |

### **Product Routes** (`/api/products`)
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/` | ❌ | Get all products |
| GET | `/:id` | ❌ | Get product by ID |
| POST | `/` | ✅ | Create product |
| PUT | `/:id` | ✅ | Update product |
| DELETE | `/:id` | ✅ | Delete product |

---

## 💡 Tips for Beginners

1. **Use Prisma Studio** - Visual database editor at `http://localhost:5555`
   ```bash
   npm run prisma:studio
   ```

2. **Test with Postman or Thunder Client** - Makes API testing easy

3. **Follow the data flow:**
   ```
   Request → Route → Middleware → Service → Database
                                      ↓
   Response ← Route ← Service ← Database
   ```

4. **Check terminal logs** - Errors and console.logs appear here

5. **Use nodemon** - Auto-restarts server on file changes (already configured!)

6. **Read error messages carefully** - They tell you exactly what's wrong

---

## 🐛 Common Errors & Solutions

### **Error: "Port 3000 already in use"**
```bash
# Solution 1: Stop the old server (Ctrl+C in terminal)
# Solution 2: Change PORT in .env file to 3001
```

### **Error: "Database connection failed"**
```bash
# Check DATABASE_URL in .env
# Make sure PostgreSQL is running
# Test connection: npx prisma db pull
```

### **Error: "Module '@prisma/client' not found"**
```bash
# Regenerate Prisma Client
npx prisma generate
```

### **Error: "Invalid token" or "No token provided"**
```bash
# Solution: Login again to get fresh token
# Make sure you include: Authorization: Bearer YOUR_TOKEN
```

### **Error: "User already exists"**
```bash
# Use a different email address for registration
```

---

## 📚 Next Steps to Learn

### Beginner:
1. ✅ Test all endpoints in Postman
2. ✅ Add a new field to Product (e.g., `brand`)
3. ✅ Create sample users and products via Prisma Studio

### Intermediate:
1. Add input validation (use Zod library)
2. Add pagination to product list
3. Add search/filter functionality
4. Add image upload for products

### Advanced:
1. Add roles (admin, customer)
2. Add order system
3. Add email verification
4. Deploy to production (Railway, Render, etc.)

---

## 🎉 Your Clean Architecture

✅ **No unused files** - Removed unnecessary code  
✅ **Combined routes & handlers** - Easier to understand  
✅ **Single entry point** - Everything in `server.ts`  
✅ **Standard Prisma setup** - No custom configs  
✅ **Environment-based config** - All in `.env`  

---

## 📖 Useful Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Authentication](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🚀 You're All Set!

Your server is running at **http://localhost:3000**

**Start building something amazing!** 🎨

Need help? Check the code - it has comments explaining everything!
