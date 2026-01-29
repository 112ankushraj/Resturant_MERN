import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* 🔥 MIDDLEWARE FIRST */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*", // Postman ke liye
    credentials: true,
  })
);

/* DB */
connectDB();

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/auth", authRoutes);

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
