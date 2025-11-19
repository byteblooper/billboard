A modern, scalable e-commerce backend built with Node.js, Express, TypeScript, Prisma, and PostgreSQL (Neon).

## 🚀 Features

- ✅ RESTful API architecture
- ✅ TypeScript for type safety
- ✅ Prisma ORM for database management
- ✅ JWT-based authentication
- ✅ Input validation with Zod
- ✅ Error handling middleware
- ✅ CORS and security with Helmet
- ✅ Request logging with Morgan
- ✅ PostgreSQL database (Neon)
- ✅ Modular and scalable structure

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.ts                # Entry point
│   ├── app.ts                   # Express app setup & middleware
│   ├── config/
│   │   ├── database.ts          # Prisma client + DB config
│   │   └── env.ts               # Environment variables loader
│   ├── routes/
│   │   ├── index.ts             # Central router aggregator
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   └── product.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   └── product.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── product.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validator.ts
│   │   └── responseHandler.ts
│   └── types/
│       └── custom.d.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── .env
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update `.env` file:

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="your-neon-database-url"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=*
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Run Database Migrations

```bash
npm run prisma:push
```

Or use migrations:

```bash
npm run prisma:migrate
```

### 5. Seed Database (Optional)

```bash
npm run seed
```

This will create:
- Sample users with hashed passwords
- Sample products

### 6. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample data |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:push` | Push schema changes to database |
| `npm run prisma:studio` | Open Prisma Studio |

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/refresh` | Refresh access token | No |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/:id` | Get user by ID | Yes |
| PUT | `/api/users/:id` | Update user | Yes |
| DELETE | `/api/users/:id` | Delete user | Yes |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get product by ID | No |
| POST | `/api/products` | Create product | Yes |
| PUT | `/api/products/:id` | Update product | Yes |
| DELETE | `/api/products/:id` | Delete product | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health status |
| GET | `/` | API information |


## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - ORM for database
- **PostgreSQL** - Database (Neon)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - Request logging


Example login request:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

## 📦 Production Build

```bash
npm run build
npm start
```

## 🔒 Security Notes

- Change `JWT_SECRET` in production
- Use strong passwords for database
- Enable HTTPS in production
- Implement rate limiting
- Add input sanitization
- Use environment-specific configurations



## 👤 Author

Rian Hasan Siam
