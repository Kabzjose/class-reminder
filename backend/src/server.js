import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import classRoutes from "./routes/classRoutes.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
connectDB();

const app = express();

aapp.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRoutes)

app.use("/api/classes", classRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
