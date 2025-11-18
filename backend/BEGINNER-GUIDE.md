# 🎓 Beginner's Guide to Your E-commerce Backend

## ✅ What Changed?

I've **simplified the code** to make it easier to understand as a new coder!

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
│   ├── server.ts          # Starts the server
│   ├── app.ts             # Sets up Express
│   │
│   ├── config/
│   │   ├── database.ts    # Connects to database
│   │   └── env.ts         # Loads settings from .env
│   │
│   ├── routes/            # URLs for your API
│   ├── controllers/       # Handles requests
│   ├── services/          # Business logic
│   ├── middlewares/       # Check things before processing
│   └── utils/             # Helper functions
│
├── prisma/
│   ├── schema.prisma      # Database tables definition
│   └── seed.ts            # Sample data
```

---

## 🔑 Key Concepts (Simple Explanation)

### 1. **Routes** (URLs)
- Routes are like addresses for your API
- Example: `/api/products` → Get all products

### 2. **Controllers** (Request Handlers)
- Controllers handle what happens when someone visits a route
- They take data from the request and send back a response

### 3. **Services** (Business Logic)
- Services talk to the database
- They do the actual work (create, read, update, delete)

### 4. **Middlewares** (Gatekeepers)
- Check things before processing a request
- Example: Is the user logged in?

---

## 🚀 How to Use Your API

### Test in Browser or Postman:

#### 1. **Check if server is running:**
```
http://localhost:3000
```

#### 2. **Get all products:**
```
GET http://localhost:3000/api/products
```

#### 3. **Register a new user:**
```
POST http://localhost:3000/api/auth/register
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

#### 4. **Login:**
```
POST http://localhost:3000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

You'll get back a `token`. Copy it!

#### 5. **Get all users (needs token):**
```
GET http://localhost:3000/api/users
Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📝 What Each File Does (Simple)

### **src/server.ts**
- Starts the server
- Listens on port 3000

### **src/app.ts**
- Creates the Express app
- Sets up routes
- Handles errors

### **src/config/database.ts**
```javascript
// Just creates one connection to the database
const prisma = new PrismaClient();
```

### **src/config/env.ts**
```javascript
// Loads settings from .env file
export const config = {
  PORT: 3000,
  JWT_SECRET: 'your-secret-key'
};
```

### **src/services/auth.service.ts**
- `registerUser()` - Creates a new user
- `loginUser()` - Checks password and gives token
- `getUserById()` - Gets user info

### **src/controllers/auth.controller.ts**
```javascript
// Example: Register
export const register = async (req, res) => {
  const { email, password, name } = req.body; // Get data
  const result = await authService.registerUser(...); // Call service
  res.json({ success: true, data: result }); // Send response
};
```

---

## 🎯 Common Tasks

### Add a new product:
1. Open Prisma Studio: `npm run prisma:studio`
2. Click "Product"
3. Add new record

### See database:
```bash
npm run prisma:studio
```

### Add sample data:
```bash
npm run seed
```

### Restart server:
- Press `Ctrl+C` in terminal
- Run `npm run dev` again

---

## 💡 Tips for Beginners

1. **Start with routes** - Look at `src/routes/` to see all available URLs

2. **Follow the flow:**
   - Route → Controller → Service → Database
   
3. **Test one thing at a time** - Use Postman or curl to test each endpoint

4. **Check the console** - Errors will show in your terminal

5. **Use Prisma Studio** - Easy way to see and edit database

---

## 🐛 Common Errors & Solutions

**Error: "Port 3000 already in use"**
- Solution: Stop the old server (Ctrl+C) or change PORT in .env

**Error: "Database connection failed"**
- Solution: Check DATABASE_URL in .env file

**Error: "Token invalid"**
- Solution: Login again to get a new token

**Error: "User not found"**
- Solution: Register a user first

---

## 📚 Next Steps to Learn

1. **Try all the endpoints** - Register, login, get products
2. **Add a new field** to User or Product in `schema.prisma`
3. **Create a new endpoint** - Copy an existing route and modify it
4. **Add validation** - Check if email is valid, password is strong

---

## 🎉 You're Ready!

Your server is running and ready to use. Start by testing the endpoints in Postman!

Need help? Check the code comments or ask questions!
