Class Reminder Application (MERN Stack)

A full-stack class scheduling and reminder application built with the MERN stack, featuring secure authentication, user-scoped CRUD operations, and a protected frontend architecture.

This project demonstrates production-style backend authorization, frontend state management, and API design — not just basic CRUD.

🚀 Features
Authentication & Security

User registration and login

Password hashing with bcrypt

JWT-based authentication

Protected routes (frontend + backend)

Users can only access their own data

Class Management

Create, read, update, delete classes

Classes are strictly scoped to the authenticated user

Clean RESTful API design

Frontend

React with modern hooks

Context API for authentication state

Protected routes

Controlled forms with proper state handling

Backend

Node.js & Express

MongoDB with Mongoose

Middleware-based authentication

Clean separation of routes, controllers, and models

🧱 Tech Stack

Frontend

React

React Router

Axios

Context API

Backend

Node.js

Express

MongoDB

Mongoose

JSON Web Tokens (JWT)

bcryptjs

📁 Project Structure
Backend
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── classController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── user.js
│   │   └── class.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── classRoutes.js
│   ├── utils/
│   │   └── token.js
│   └── server.js
└── package.json

Frontend
frontend/
├── src/
│   ├── components/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
└── package.json

🔐 Authentication Flow

User registers or logs in

Passwords are hashed before storage

JWT is issued on successful authentication

JWT is required to access protected endpoints

Backend validates token and user ownership on every request

This prevents:

Unauthorized access

Cross-user data leaks

Direct ID manipulation attacks

🔑 Environment Variables

Create a .env file in the backend root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Frontend runs on http://localhost:5173
Backend runs on http://localhost:5000

🧪 API Endpoints (Summary)
Auth

POST /api/auth/register – Register user

POST /api/auth/login – Login user

Classes (Protected)

GET /api/classes – Get user classes

POST /api/classes – Create class

PUT /api/classes/:id – Update class

DELETE /api/classes/:id – Delete class

🛡️ Security Considerations

Passwords are never stored in plain text

JWT is validated on every protected request

Users cannot access or modify other users’ data

Backend enforces ownership checks at the database level

📌 Future Improvements

Refresh token rotation

Rate limiting on auth routes

Role-based access control (admin/user)

Input validation with Joi or Zod

Deployment (Render / Vercel / MongoDB Atlas)

👤 Author

Built by [Your Name]
Role: Full-Stack Developer (MERN)

✅ Final Note

This project is designed as a production-style MERN application, not a tutorial demo. It focuses on correct architecture, security, and state management, forming a strong foundation for real-world applications.
